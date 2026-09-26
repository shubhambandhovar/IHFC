import React, { createContext, useState, useEffect, useContext } from 'react';
import { fallbackModules } from '../data/fallbackData';

export const ProgressContext = createContext();

// Use versioning to invalidate old data when schema changes
const PROGRESS_SCHEMA_VERSION = 2;
const STORAGE_KEY = `ihfc_progress_v${PROGRESS_SCHEMA_VERSION}`;

export const ProgressProvider = ({ children }) => {
    // Initial State Structure
    const [progress, setProgress] = useState({
        lessons: {}, // { [lessonId]: { status: 'completed' | 'in_progress', watchedPercent: 0, completedAt: null } }
        lastActiveLesson: null // { resourceId, lessonId }
    });
    
    const courseStartDate = new Date('2026-09-28T00:00:00');
    const today = new Date();
    const isCourseStarted = today >= courseStartDate;

    useEffect(() => {
        // Clear old progress versions
        for (let i = 0; i < PROGRESS_SCHEMA_VERSION; i++) {
            localStorage.removeItem(`ihfc_progress_v${i}`);
        }
        localStorage.removeItem('ihfc_progress'); // Clear generic one if it exists

        const storedProgress = localStorage.getItem(STORAGE_KEY);
        if (storedProgress) {
            try {
                setProgress(JSON.parse(storedProgress));
            } catch (e) {
                console.error("Failed to parse stored progress", e);
            }
        }
    }, []);

    // Save progress on change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }, [progress]);

    // Track a lesson as completed
    const markLessonCompleted = (resourceId, lessonId) => {
        setProgress(prev => ({
            ...prev,
            lessons: {
                ...prev.lessons,
                [lessonId]: {
                    status: 'completed',
                    watchedPercent: 100,
                    completedAt: new Date().toISOString()
                }
            },
            lastActiveLesson: { resourceId, lessonId }
        }));
    };

    // Update lesson watch percentage
    const updateLessonProgress = (resourceId, lessonId, percent) => {
        setProgress(prev => {
            const currentLesson = prev.lessons[lessonId];
            if (currentLesson?.status === 'completed') return prev; // Do not overwrite if already completed
            
            // Mark completed if watched > 90%
            if (percent >= 90) {
                return {
                    ...prev,
                    lessons: {
                        ...prev.lessons,
                        [lessonId]: {
                            status: 'completed',
                            watchedPercent: 100,
                            completedAt: new Date().toISOString()
                        }
                    },
                    lastActiveLesson: { resourceId, lessonId }
                };
            }

            return {
                ...prev,
                lessons: {
                    ...prev.lessons,
                    [lessonId]: {
                        status: 'in_progress',
                        watchedPercent: percent,
                        completedAt: null
                    }
                },
                lastActiveLesson: { resourceId, lessonId }
            };
        });
    };

    // Calculate completion for a specific resource (playlist)
    const getResourceProgress = (resourceId) => {
        const moduleData = fallbackModules.find(m => m._id === resourceId);
        if (!moduleData || !moduleData.lessons) return { completed: 0, total: 1, percent: 0 };
        
        // Exclude demo lessons
        const realLessons = moduleData.lessons.filter(l => !l.isDemo);
        const total = realLessons.length || 1;
        
        const completed = realLessons.filter(l => progress.lessons[l._id]?.status === 'completed').length;
        const percent = Math.round((completed / total) * 100);
        
        return { completed, total, percent };
    };

    // Get core module completion status
    const coreModulesMap = {
        '1': null, // Program Induction
        '2': null, // Python Refresher With AI
        '3': null, // Applied Data Science With Python
        '4': 'machine-learning', // Machine Learning
        '5': 'deep-learning', // Deep Learning Specialization
        '6': 'generative-ai-roadmap', // GenAI Literacy
        '7': 'generative-ai-langchain', // Advanced Generative AI
        '8': null // Capstone Project
    };

    const getCoreModuleStatus = (moduleId) => {
        const resourceId = coreModulesMap[moduleId];
        if (!resourceId) return 'not_started'; // No resources assigned yet
        
        const resourceProg = getResourceProgress(resourceId);
        if (resourceProg.total > 0 && resourceProg.completed === resourceProg.total) {
            return 'completed';
        }
        if (resourceProg.completed > 0) {
            return 'in_progress';
        }
        return 'not_started';
    };

    // Calculate total program progress
    const getProgramProgress = () => {
        let completedCoreModules = 0;
        const totalCoreModules = 8;
        
        Object.keys(coreModulesMap).forEach(moduleId => {
            if (getCoreModuleStatus(moduleId) === 'completed') {
                completedCoreModules++;
            }
        });

        return {
            completedModules: completedCoreModules,
            totalModules: totalCoreModules,
            percentage: Math.round((completedCoreModules / totalCoreModules) * 100)
        };
    };

    const getLessonStatus = (lessonId) => {
        return progress.lessons[lessonId] || { status: 'not_started', watchedPercent: 0 };
    };

    const value = {
        progress,
        isCourseStarted,
        courseStartDateStr: '28/09/2026',
        markLessonCompleted,
        updateLessonProgress,
        getResourceProgress,
        getCoreModuleStatus,
        getProgramProgress,
        getLessonStatus
    };

    return (
        <ProgressContext.Provider value={value}>
            {children}
        </ProgressContext.Provider>
    );
};

export const useProgress = () => useContext(ProgressContext);

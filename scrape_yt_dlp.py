import subprocess
import json

targets = [
    {
        "id": "1",
        "title": "Machine Learning",
        "instructor": "Krish Naik",
        "url": "https://www.youtube.com/playlist?list=PLZoTAELRMXVPBTrWtJkn3wWQxZkmTXGwe"
    },
    {
        "id": "2",
        "title": "Deep Learning",
        "instructor": "Krish Naik",
        "url": "https://www.youtube.com/playlist?list=PLZoTAELRMXVPGU70ZGsckrMdr0FteeRUi"
    },
    {
        "id": "3",
        "title": "Generative AI Roadmap",
        "instructor": "CampusX",
        "url": "https://www.youtube.com/watch?v=pSVk-5WemQ0",
        "is_single": True
    },
    {
        "id": "4",
        "title": "Advanced Generative AI / LangChain",
        "instructor": "CampusX",
        "url": "https://www.youtube.com/playlist?list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0"
    },
    {
        "id": "5",
        "title": "Natural Language Processing",
        "instructor": "Krish Naik",
        "url": "https://www.youtube.com/playlist?list=PLZoTAELRMXVNNrHSKv36Lr3_156yCo6Nn"
    }
]

modules = []

for target in targets:
    print(f"Extracting {target['title']}...")
    
    cmd = [
        "python", "-m", "yt_dlp", 
        "--dump-json", 
        "--flat-playlist", 
        target["url"]
    ]
    
    result = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8')
    
    lessons = []
    
    if target.get("is_single"):
        # For a single video, yt-dlp returns exactly one JSON object
        for line in result.stdout.strip().split('\n'):
            if not line: continue
            video = json.loads(line)
            title = video.get('title', 'Unknown Title')
            vid = video.get('id', '')
            lessons.append({
                "_id": vid,
                "title": f"01 {title}",
                "videoProvider": "youtube",
                "videoUrl": f"https://www.youtube.com/embed/{vid}",
                "published": True
            })
    else:
        # Playlist output
        count = 1
        for line in result.stdout.strip().split('\n'):
            if not line: continue
            try:
                video = json.loads(line)
                title = video.get('title', 'Unknown Title')
                if title == '[Private video]' or title == '[Deleted video]':
                    continue
                vid = video.get('id', '')
                lessons.append({
                    "_id": f"{target['id']}_{count}",
                    "title": f"{count:02d} {title}",
                    "videoProvider": "youtube",
                    "videoUrl": f"https://www.youtube.com/embed/{vid}",
                    "published": True
                })
                count += 1
            except Exception as e:
                pass

    modules.append({
        "_id": target["id"],
        "title": target["title"],
        "instructor": target["instructor"],
        "published": True,
        "lessons": lessons
    })

# Add the specific Python demo lesson at the very beginning
python_module = {
    "_id": "0",
    "title": "Python & Data Science",
    "instructor": "Demo Provider",
    "published": True,
    "lessons": [
        { 
            "_id": "demo_p1", 
            "title": "01 Introduction to Python (Demo)", 
            "videoProvider": "self-hosted", 
            "videoUrl": "/test-course-video.mp4", 
            "isDemo": True,
            "published": True 
        }
    ]
}
modules.insert(0, python_module)

with open('fallback_data.json', 'w', encoding='utf-8') as f:
    json.dump(modules, f, indent=4)

print("Finished!")

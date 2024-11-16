#!/bin/bash

# Check if VIDEO_LINK is provided
if [ -z "$VIDEO_LINK" ]; then
    echo "Please provide the VIDEO_LINK environment variable"
    exit 1
fi

if [ -z "$KEY" ]; then
    echo "Please provide the KEY environment variable"
    exit 1
fi

# Download the video using curl
curl -o video.mp4 "$VIDEO_LINK"

# Optionally, you can add more logic here such as error handling
# For example:
# if [ $? -ne 0 ]; then
#   echo "Failed to download the video"
#   exit 1
# fi

mkdir -p /app/output


ffmpeg -i "video.mp4" -vn -acodec copy "/app/output/audio.aac"

 

ffmpeg -i "video.mp4" -vf "scale=trunc(oh*a/2)*2:260" -c:a copy "/app/output/output_240p.mp4"

ffmpeg -i "video.mp4" -vf "scale=trunc(oh*a/2)*2:360" -c:a copy "/app/output/output_340p.mp4"

ffmpeg -i "video.mp4" -vf "scale=trunc(oh*a/2)*2:480" -c:a copy "/app/output/output_460p.mp4"

ffmpeg -i "video.mp4" -vf "scale=trunc(oh*a/2)*2:720" -c:a copy  "/app/output/output_720p.mp4"



echo "Video downloaded successfully"

KEY="$KEY" node /app/script.js
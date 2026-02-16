#!/bin/bash
# Generate missing persona avatars for Roleplay Studio
cd /Users/neo/openclaw/workspace/roleplay-studio/public/avatars

SCRIPT="/opt/homebrew/lib/node_modules/openclaw/skills/openai-image-gen/scripts/gen.py"

# Diana Reeves - COO
echo "Generating Diana Reeves..."
python3 $SCRIPT --model dall-e-3 --size 1024x1024 --quality hd --style natural --prompt "Professional corporate headshot portrait of Diana Reeves, a confident African American woman in her early 50s, no-nonsense executive expression, wearing elegant business suit, neutral gray background, soft studio lighting, looking directly at camera, C-suite executive, high quality professional photo" --out-dir .
mv 001-*.png diana-reeves.png 2>/dev/null

# Alex Torres - All-hands attendee
echo "Generating Alex Torres..."
python3 $SCRIPT --model dall-e-3 --size 1024x1024 --quality hd --style natural --prompt "Professional corporate headshot portrait of Alex Torres, a friendly Hispanic man in his mid-30s, engaged and attentive expression, wearing smart casual button-up shirt, neutral gray background, soft studio lighting, looking directly at camera, approachable employee, high quality professional photo" --out-dir .
mv 001-*.png alex-torres.png 2>/dev/null

# Jordan Blake - Conference attendee  
echo "Generating Jordan Blake..."
python3 $SCRIPT --model dall-e-3 --size 1024x1024 --quality hd --style natural --prompt "Professional corporate headshot portrait of Jordan Blake, an intellectually curious person in their late 30s, sharp analytical expression, wearing business professional attire, neutral gray background, soft studio lighting, looking directly at camera, thoughtful conference attendee, high quality professional photo" --out-dir .
mv 001-*.png jordan-blake.png 2>/dev/null

# Sam Parker - High performer
echo "Generating Sam Parker..."
python3 $SCRIPT --model dall-e-3 --size 1024x1024 --quality hd --style natural --prompt "Professional corporate headshot portrait of Sam Parker, a confident successful professional in their early 30s, self-assured expression, wearing stylish business casual, neutral gray background, soft studio lighting, looking directly at camera, high achiever energy, high quality professional photo" --out-dir .
mv 001-*.png sam-parker.png 2>/dev/null

# Taylor Morgan - Direct report
echo "Generating Taylor Morgan..."
python3 $SCRIPT --model dall-e-3 --size 1024x1024 --quality hd --style natural --prompt "Professional corporate headshot portrait of Taylor Morgan, a capable young professional in their late 20s, earnest and determined expression, wearing neat business casual, neutral gray background, soft studio lighting, looking directly at camera, eager employee, high quality professional photo" --out-dir .
mv 001-*.png taylor-morgan.png 2>/dev/null

# Catherine Walsh - CEO
echo "Generating Catherine Walsh..."
python3 $SCRIPT --model dall-e-3 --size 1024x1024 --quality hd --style natural --prompt "Professional corporate headshot portrait of Catherine Walsh, an authoritative Caucasian woman in her mid-50s with silver-streaked hair, commanding CEO presence, wearing impeccable executive suit, neutral gray background, soft studio lighting, looking directly at camera, powerful leader, high quality professional photo" --out-dir .
mv 001-*.png catherine-walsh.png 2>/dev/null

# Jamie Chen - Team member
echo "Generating Jamie Chen..."
python3 $SCRIPT --model dall-e-3 --size 1024x1024 --quality hd --style natural --prompt "Professional corporate headshot portrait of Jamie Chen, a thoughtful Asian American professional in their early 30s, slightly concerned but hopeful expression, wearing casual business attire, neutral gray background, soft studio lighting, looking directly at camera, relatable team member, high quality professional photo" --out-dir .
mv 001-*.png jamie-chen.png 2>/dev/null

# Cleanup
rm -f prompts.json index.html 2>/dev/null

echo "Done! Generated all missing avatars."

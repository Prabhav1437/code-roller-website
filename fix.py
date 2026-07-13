import os
import glob

files = glob.glob('**/*.html', recursive=True)

old_str = '<div class="absolute top-full left-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-xl p-2 hidden group-hover:block z-[200]">'
new_str = '<div class="absolute top-full left-0 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-xl p-2 hidden group-hover:block z-[200]">'

count = 0
for f in files:
    with open(f, 'r') as file:
        content = file.read()
    if old_str in content:
        content = content.replace(old_str, new_str)
        with open(f, 'w') as file:
            file.write(content)
        count += 1
        print(f"Updated {f}")

print(f"Total files updated: {count}")

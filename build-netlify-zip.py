import os
import zipfile
import shutil

ROOT_DIR = os.path.abspath(os.path.dirname(__file__))
PUBLIC_DIR = os.path.join(ROOT_DIR, "public")
DOWNLOADS_DIR = os.path.join(PUBLIC_DIR, "downloads")

os.makedirs(DOWNLOADS_DIR, exist_ok=True)

# 1. kaziremote-public-deploy.zip (Contents of public/ directly for Netlify Drop)
public_zip_path = os.path.join(ROOT_DIR, "kaziremote-public-deploy.zip")
with zipfile.ZipFile(public_zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(PUBLIC_DIR):
        # Exclude downloads directory to avoid recursion
        if "downloads" in dirs:
            dirs.remove("downloads")
        for file in files:
            file_path = os.path.join(root, file)
            arcname = os.path.relpath(file_path, PUBLIC_DIR)
            zipf.write(file_path, arcname)

print(f"Created {public_zip_path} ({os.path.getsize(public_zip_path)} bytes)")

# 2. kaziremote-netlify.zip (Complete Netlify repo with netlify.toml and public/)
repo_zip_path = os.path.join(ROOT_DIR, "kaziremote-netlify.zip")
with zipfile.ZipFile(repo_zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
    # Add netlify.toml
    if os.path.exists(os.path.join(ROOT_DIR, "netlify.toml")):
        zipf.write(os.path.join(ROOT_DIR, "netlify.toml"), "netlify.toml")
    # Add _redirects
    if os.path.exists(os.path.join(ROOT_DIR, "_redirects")):
        zipf.write(os.path.join(ROOT_DIR, "_redirects"), "_redirects")
    # Add README.md
    if os.path.exists(os.path.join(ROOT_DIR, "README.md")):
        zipf.write(os.path.join(ROOT_DIR, "README.md"), "README.md")
    # Add public directory
    for root, dirs, files in os.walk(PUBLIC_DIR):
        if "downloads" in dirs:
            dirs.remove("downloads")
        for file in files:
            file_path = os.path.join(root, file)
            arcname = os.path.relpath(file_path, ROOT_DIR)
            zipf.write(file_path, arcname)

print(f"Created {repo_zip_path} ({os.path.getsize(repo_zip_path)} bytes)")

# Copy to downloads directory so user can access or download from web UI
shutil.copyfile(public_zip_path, os.path.join(DOWNLOADS_DIR, "kaziremote-public-deploy.zip"))
shutil.copyfile(repo_zip_path, os.path.join(DOWNLOADS_DIR, "kaziremote-netlify.zip"))
print("Copied zip archives to public/downloads/")

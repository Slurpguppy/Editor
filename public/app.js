let directoryHandles = new Map(); // Store file handles for later use
const openDirectoryButton = document.getElementById("open-directory");
const fileList = document.getElementById("file-list");

openDirectoryButton.addEventListener("click", async () => {
    try {
        // Request a directory from the user
        const directoryHandle = await window.showDirectoryPicker();
        // Display its contents
        await displayDirectoryContents(directoryHandle);
    } catch (error) {
        console.error("Error opening directory:", error);
    }
});

async function displayDirectoryContents(directoryHandle) {
    fileList.innerHTML = ""; // Clear the current list
    directoryHandles.clear(); // Clear previous file handles

    for await (const [name, handle] of directoryHandle.entries()) {
        const listItem = document.createElement("li");
        listItem.textContent = name;

        // Store the handle in the directoryHandles map with the file name as key
        directoryHandles.set(name, handle);

        if (handle.kind === "directory") {
            // Highlight directories
            listItem.style.fontWeight = "bold";
        }

        listItem.addEventListener("click", async () => {
            if (handle.kind === "directory") {
                // Navigate into the directory
                await displayDirectoryContents(handle);
            } else if (handle.kind === "file") {
                // When the user clicks on a file, its content is displayed in the editor
                const file = await handle.getFile();
                const reader = new FileReader();

                reader.onload = function(event) {
                    const editor = monaco.editor.getModels()[0];  // Get Monaco editor instance
                    editor.setValue(event.target.result);  // Set file content to Monaco editor
                };

                reader.readAsText(file);
            }
        });

        fileList.appendChild(listItem);
    }
}

// When the user clicks on a file in the file list, load its content into Monaco editor
document.getElementById("file-list").addEventListener("click", async (e) => {
    if (e.target && e.target.nodeName === "LI") {
        const fileName = e.target.textContent;

        // Get file handle from the map by name
        const fileHandle = directoryHandles.get(fileName);

        if (fileHandle) {
            // Read file content and set it in Monaco editor
            const file = await fileHandle.getFile();
            const reader = new FileReader();

            reader.onload = function(event) {
                const editor = monaco.editor.getModels()[0];  // Get Monaco editor instance
                editor.setValue(event.target.result);  // Set file content to Monaco editor
            };

            reader.readAsText(file);
        } else {
            alert('File not found!');
        }
    }
});

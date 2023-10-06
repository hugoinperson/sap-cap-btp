# Dev Containers
When you open the project in VS Code, you will be prompted to open the project in a dev container. This will automatically install all the dependencies and tools you need to develop the project. If you do not see this prompt, you can open the command palette and search for `Remote-Containers: Reopen in Container`.

## Docker
To use dev containers, you will need to have Docker installed on your machine. You can download Docker [here](https://www.docker.com/products/docker-desktop).

## Git
In order to push your code from within the container, you will need to pass your SSH key into the container.

### 1. Modify your devcontainer.json:


You can do this by adding the following to your `devcontainer.json` file:
```json
"mounts": [
  "source=${localEnv:HOME}${localEnv:USERPROFILE}/.ssh/id_rsa,target=/home/vscode/.ssh/id_rsa,type=bind"
]
```
Here, we're telling Docker to mount your local SSH private key (`id_rsa`) into the dev container's home directory under the `.ssh` folder. Replace `id_rsa` with the name of your SSH private key file if it's different.

### 2. Rebuild the Dev Container:
If VS Code doesn't automatically prompt you to rebuild the container, you need to close the dev container and rebuild it. This is necessary for the new mounting configuration to take effect. In VS Code, use the command palette (`Cmd/Ctrl + Shift + P`), then select `Remote-Containers: Rebuild Container`.

### 3. Check the SSH Key Inside the Container:
After the container rebuilds and reopens, open a terminal inside the container and run:
```bash
cat /home/vscode/.ssh/id_rsa
```
This should display the content of your SSH private key, confirming that it's now accessible inside the container.

### 4. Add the Key to the SSH Agent Inside the Container:
```bash
ssh-add /home/vscode/.ssh/id_rsa
```
Again, replace `id_rsa` with the name of your SSH private key file if it's different.

### 5. Test the Connection:
```bash
ssh -T git@bitbucket.org
```
You should get a message saying that you've successfully authenticated, indicating that the correct key is now being used.
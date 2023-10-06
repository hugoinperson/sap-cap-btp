# Getting Started

Welcome to your new project.

It contains these folders and files, following our recommended project layout:

| File or Folder | Purpose                              |
| -------------- | ------------------------------------ |
| `app/`         | content for UI frontends goes here   |
| `db/`          | your domain models and data go here  |
| `srv/`         | your service models and code go here |
| `package.json` | project metadata and configuration   |
| `readme.md`    | this getting started guide           |

## Next Steps

- Open a new terminal and run `cds watch`
- (in VS Code simply choose _**Terminal** > Run Task > cds watch_)
- Start adding content, for example, a [db/schema.cds](db/schema.cds).

## Learn More

Learn more at https://cap.cloud.sap/docs/get-started/.
Code examples at https://github.com/SAP-samples/cloud-cap-samples.

# Requirements

## Access to SAP Business Technology Platform Cloud Foundry environment

There you need to have account. MTA examples will be deployed in some of the account’s organization and space.

## Installed CloudFoundry CLI

For more information about installation of CloudFoundry CLI, please visit the official [CloudFoundry Documentation](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html). For the examples, CloudFoundry CLI v8 is supported.

## Installed MultiApps CF CLI Plugin

Ensure that MultiApps CF CLI Plugin is installed and working. For more information, please visit the official [GitHub Page](https://github.com/cloudfoundry-incubator/multiapps-cli-plugin#download-and-installation).

Run the below command to show the installed plugins:

```bash
cf plugins
```

You can run this command to uninstall the old version and update to the latest version of `multiapps` plugin:

```bash
cf install-plugin multiapps
```

## Installed Cloud MTA Build Tool

The Cloud MTA Build Tool is a standalone command-line tool that builds a deployment-ready multitarget application (MTA) archive `.mtar` file from the artifacts of an MTA project according to the project’s MTA development descriptor (`mta.yaml` file)

For more information please visit the official [Cloud MTA Build Tool Documentation](https://sap.github.io/cloud-mta-build-tool/)

You can install the tool using npm:

```bash
npm install -g mbt
```

# Environment Setup

```bash
# Install Node.js 18.x
nvm install 18

# Check the current Node.js version (should be 18.x)
node -v

# Install Cloud Foundry CLI
wget -q -O - https://packages.cloudfoundry.org/debian/cli.cloudfoundry.org.key | sudo apt-key add -
echo "deb https://packages.cloudfoundry.org/debian stable main" | sudo tee /etc/apt/sources.list.d/cloudfoundry-cli.list
sudo apt-get update
sudo apt-get install cf8-cli

# Install CF MTA plugin
cf install-plugin multiapps

# Install MTAR Builder
npm i -g mbt

# Install MTA
npm i -g mta

# Install CAP tooling
npm i -g @sap/cds-dk

# Install UI5 cli
npm i -g @ui5/cli
```

Login to the desired Cloud Foundry target.

```bash
# Log into SAP BTP CF space
# You can get the API endpoint from the BTP subaccount "Cloud Foundry Environment" section
cf l -a <CF API endpoint> -u <BTP username> -p <BTP password>

# Set the target CF organization and space
cf t -o <CF org> -s <CF space>
```

You can verify that you are logged in to the right place by:

```bash
cf t
```

# Resources

- [Expose HTML5 Applications in SAP Build Work Zone](https://help.sap.com/docs/build-work-zone-standard-edition/sap-build-work-zone-standard-edition/expose-html5-applications-in-sap-build-work-zone-standard-edition)
- https://github.com/ui5-community/ui5-ecosystem-showcase
- https://github.com/SAP-samples/cf-mta-examples
- https://cap.cloud.sap/docs/guides/using-services

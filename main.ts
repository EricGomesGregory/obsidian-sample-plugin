import { App, Command, Editor, MarkdownPostProcessorContext, MarkdownView, Modal, Plugin, PluginSettingTab, Setting, TFile, View, WorkspaceLeaf, parseYaml, stringifyYaml } from 'obsidian';
import { createRoot } from 'react-dom/client';
import NpcStatblock from 'src/components/NpcStatblock';
import { INpcData, createNpcData } from 'src/types/Npc';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

export default class CyberpunkRedPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		this.registerView(
      "cyberpunk-view",
      (leaf) => new CyberpunkView(leaf)
    );

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('dice', 'Cyberpunk RED', (evt: MouseEvent) => {
			this.activateView();
		});
		// Perform additional things with the ribbon
		ribbonIconEl.addClass('my-plugin-ribbon-class');

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status Bar Text');

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-cyberpunk-red-modal',
			name: 'Open Cyberpunk RED Modal (simple)',
			callback: () => {
				new CyberpunkModal(this.app).open();
			}
		});
		
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'sample-editor-command',
			name: 'Sample editor command',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection('Sample Editor Command');
			}
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: 'open-cyberpunk-red-modal',
			name: 'Open Cyberpunk RED Modal (complex)',
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						new CyberpunkModal(this.app).open();
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
			}
		});

		this.addCommand({
			id:'insert-npc-statblock',
			name:'Insert NPC Statblock',
			editorCallback: () => {
				const command: Command = {
					id:'insert-npc-statblock-command',
					name:'Command: Insert NPC Statblock'
				}

				this.insertNpcStatblock(command)
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		//CodeBlock Processors
		this.registerMarkdownCodeBlockProcessor("cpr-npc", (source, element, context) => {
			const data = parseYaml(source) as INpcData
			
			const root = createRoot(element)
			const statblock = new NpcStatblock(data).render()
			root.render(statblock)
		});

		this.registerMarkdownPostProcessor((element, context) => {
			const results = element.querySelectorAll('span.internal-embed');
			results.forEach((result) => {
				console.log(result)
				const src = result.getAttribute('src')
				console.log(src)
				const files = this.app.vault.getFiles()
				console.log(files.length)
				files.forEach(file => console.log(file.name))
				const file = files.find(file => file.name == src)
				if (file) {
					this.readData(file, element, context)
				}
			})
		})
		
		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}


	async readData(file: TFile, element: HTMLElement, context: MarkdownPostProcessorContext) {
		const raw = await this.app.vault.read(file)
		try {
			const data = parseYaml(raw) as INpcData

			const root = createRoot(element)
			const statblock = new NpcStatblock(data).render()
			root.render(statblock)

		} catch (exception) {
			console.log(exception)
		}
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async activateView() {
    const { workspace } = this.app;

    let leaf: WorkspaceLeaf | null = null;
    const leaves = workspace.getLeavesOfType("cyberpunk-view");

    if (leaves.length > 0) {
      // A leaf with our view already exists, use that
      leaf = leaves[0];
    } else {
      // Our view could not be found in the workspace, create a new leaf
      // in the right sidebar for it
      leaf = workspace.getRightLeaf(false);
      await leaf.setViewState({ type: "cyberpunk-view", active: true });
    }

    // "Reveal" the leaf in case it is in a collapsed sidebar
    workspace.revealLeaf(leaf);
  }

	insertNpcStatblock(command: Command) {
		const editor = this.app.workspace.activeEditor?.editor;
		if (editor) {
			const cursor = editor.getCursor()
			const line = cursor.line
			const position = { line, ch:0}

			const npc = createNpcData()

			const templateCode = `\`\`\`cpr-npc\n${stringifyYaml(npc)}\n\`\`\``;
			editor.replaceRange(templateCode, position, position)
		}
	}
}

class CyberpunkModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class CyberpunkView extends View {
	constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType() {
    return "cyberpunk-view";
  }

  getDisplayText() {
    return "Cyberpunk view";
  }

  async onOpen() {
    const container = this.containerEl.children[1];
    container.empty();
    container.createEl("h4", { text: "Cyberpunk view" });
  }

  async onClose() {
    // Nothing to clean up.
  }
}

class SampleSettingTab extends PluginSettingTab {
	plugin: CyberpunkRedPlugin;

	constructor(app: App, plugin: CyberpunkRedPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}

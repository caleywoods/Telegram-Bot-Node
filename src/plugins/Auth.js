const Plugin = require("./../Plugin");
module.exports = class AuthPlugin extends Plugin {

    static get plugin() {
        return {
            name: "this.auth",
            description: "Plugin to handle authentication",
            help: "",

            visibility: Plugin.Visibility.VISIBLE,
            type: Plugin.Type.SPECIAL
        };
    }

    start(config, auth) {
        this.auth = auth;
    }

    onCommand({message, command, args}, reply) {
        const author = message.from.id;
        const chat = message.chat.id;
        const targetId = args[0];

        switch (command) {
        case "modlist":
            return reply({
                type: "text",
                text: JSON.stringify(this.auth.getMods(chat))
            });
        case "adminlist":
            return reply({
                type: "text",
                text: JSON.stringify(this.auth.getAdmins(chat))
            });
        // The code from here on is admin-only.
        case "addmod":
            if (!this.auth.isAdmin(author, chat)) return;

            this.auth.addMod(targetId, chat);

            return reply({
                type: "text",
                text: "Done."
            });
        case "addadmin":
            if (!this.auth.isAdmin(author, chat)) return;

            this.auth.addAdmin(targetId, chat);

            return reply({
                type: "text",
                text: "Done."
            });
        case "delmod":
            if (!this.auth.isAdmin(author, chat)) return;

            this.auth.removeMod(targetId, chat);

            return reply({
                type: "text",
                text: "Done."
            });
        case "deladmin":
            if (!this.auth.isAdmin(author, chat)) return;

            this.auth.removeAdmin(targetId, chat);

            return reply({
                type: "text",
                text: "Done."
            });
        default:
            return;
        }
    }
};
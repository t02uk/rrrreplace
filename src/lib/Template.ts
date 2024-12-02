export type Template = {
    title: string,
    search: string,
    replace: string,
};

export class TemplateRepository {
    static identity = "templates";
    static replaceAll(templates: Template[]) {
        localStorage.setItem(this.identity, JSON.stringify(templates));
    }
    static getAll() {
        return JSON.parse(localStorage.getItem(this.identity)) ?? [];
    }
    static getAt(index: number) {
        return this.getAll()[index];
    }
}
"use strict";
class GridLayout extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'closed' });
        this.rows = '';
        this.columns = '';
        this.shadow.innerHTML = this.innerHTML;
        this.innerHTML = '';
    }
    static get observedAttributes() {
        return ['rows', 'columns'];
    }
    attributeChangedCallback(attribute, oldValue, newValue) {
        switch (attribute) {
            case 'rows':
                this.rows = newValue;
                this.updateLayout();
                break;
            case 'columns':
                this.columns = newValue;
                this.updateLayout();
                break;
        }
    }
    updateLayout() {
        let rows = this.rows.trim().split(',');
        let columns = this.columns.trim().split(',');
        for (let child = 0; child < this.shadow.children.length; child++) {
            let childElement = this.shadow.children[child];
            console.log(childElement);
            let elementRow = parseInt(childElement.getAttribute('row'));
            let elementColumn = parseInt(childElement.getAttribute('col'));
            if (typeof elementRow == 'number') {
                let rowType = rows[elementRow];
                childElement.style.display = 'inline-flex';
                switch (true) {
                    case '*' == rowType:
                        childElement.style.maxHeight = '100%';
                        childElement.style.minHeight = '100%';
                        childElement.style.height = '100%';
                        break;
                    case 'auto' == rowType:
                        childElement.style.maxHeight = 'auto';
                        childElement.style.minHeight = 'auto';
                        childElement.style.height = 'auto';
                        break;
                    case 'number' == typeof parseInt(rowType):
                        childElement.style.maxHeight = `${rowType}px`;
                        childElement.style.minHeight = `${rowType}px`;
                        childElement.style.height = `${rowType}px`;
                        break;
                }
            }
            if (typeof elementColumn == 'number') {
                let colType = columns[elementColumn];
                childElement.style.display = 'inline-flex';
                switch (true) {
                    case '*' == colType:
                        childElement.style.maxWidth = '100%';
                        childElement.style.minWidth = '100%';
                        childElement.style.width = '100%';
                        break;
                    case 'auto' == colType:
                        childElement.style.maxWidth = 'auto';
                        childElement.style.minWidth = 'auto';
                        childElement.style.width = 'auto';
                        break;
                    case 'number' == typeof parseInt(colType):
                        childElement.style.maxWidth = `${colType}px`;
                        childElement.style.minWidth = `${colType}px`;
                        childElement.style.width = `${colType}px`;
                        break;
                }
            }
        }
    }
}
customElements.define("grid-layout", GridLayout);

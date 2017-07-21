class GridLayout extends HTMLElement{
    public shadow:ShadowRoot = this.attachShadow({ mode: 'closed'});
    public rows:string = '';
    public columns:string = '';
    constructor(){
        super();
        this.shadow.innerHTML = this.innerHTML;
        this.innerHTML = '';
    }

    public static get observedAttributes() {
        return ['rows', 'columns']
    }

    public attributeChangedCallback(attribute: string, oldValue: string, newValue: string) {
        switch(attribute){
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

    public updateLayout() {
        let rows = this.rows.trim().split(',');
        let columns = this.columns.trim().split(',');

        for (let child = 0; child < this.shadow.children.length; child++) {
            let childElement:HTMLElement = <HTMLElement> this.shadow.children[child];
            console.log(childElement);
            let elementRow = parseInt( <string> childElement.getAttribute('row'));
            let elementColumn = parseInt( <string> childElement.getAttribute('col'));
            if(typeof elementRow == 'number')
            {
                let rowType:string = rows[elementRow];
                childElement.style.display = 'inline-flex';

                switch(true){
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

            if(typeof elementColumn == 'number')
            {
                let colType:string = columns[elementColumn];
                childElement.style.display = 'inline-flex';

                switch(true){
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


customElements.define("view-element", view);
customElements.define("grid-layout", GridLayout);
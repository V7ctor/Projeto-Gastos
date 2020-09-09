class AccountController {

    constructor(formId, idTable, idTableFoot, idTotalPayable){
        this.idForm = document.getElementById(formId);
        this.tableId = document.getElementById(idTable);
        this.tableFoot = document.getElementById(idTableFoot);
        this.totalPayable = document.getElementById(idTotalPayable);
        this.valueSum = 0.0;
        this.submitForm();
    }

    getValues() {
        let account = {};
        let validate = true;

        [...this.idForm.elements].forEach(function(field, index) {
            if (!field.value) {
                field.parentElement.classList.add("has-error");
                validate = false;
            } else {
                account[field.name] = field.value;
            }

            if(!validate) {  
                return false;
            }

        });

        console.log(account);

        let accountUser = new Account (
            account.description,
            account.valueAccount
        );     

        return accountUser;

    }

    submitForm(){
        this.idForm.addEventListener("submit", event => {
            event.preventDefault();

            let button = this.idForm.querySelector("[type=submit]");

            button.disabled = true;

            let values = this.getValues();

            this.addLine(values, this.tableId);

            button.disabled = false;

            if (!values) return false;
        });
    }

    addLine(values, table){
        let tr = this.getTr(values);
        table.appendChild(tr);
    }

    getTr(result, tr = null){

        if (tr == null) tr = document.createElement('tr');
    
        tr.dataset.account = JSON.stringify(result);
             
        tr.innerHTML = `
            <td>${result.description}</td>
            <td>$${parseFloat(result.valuePayable).toFixed(2)}</td>
            <td><button class="delete-button">Excluir</button></td>
        `;

        this.valueSum += parseFloat(result.valuePayable);
        this.updateColumnTotalPayable(this.valueSum.toFixed(2));
        this.addEventsTr(tr, result.valuePayable);
        return tr;
    }

    updateColumnTotalPayable(value){
        this.totalPayable.innerHTML = "Total à pagar: $" + value;
    }

    addEventsTr(tr, valuePayable){

        tr.querySelector(".delete-button").addEventListener("click", e => {

            if (confirm("Deseja Realmente excluir essa conta ?")) {
                this.valueSum -=  parseFloat(valuePayable);
                this.updateColumnTotalPayable(this.valueSum.toFixed(2));
                tr.remove();
            }
        });
    }

}
import { Component, OnInit } from '@angular/core';
import { EmployeeserviceService } from 'src/app/services/employeeservice.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

interface Type { name: string, id: number }

@Component({
  selector: 'app-txn-form',
  templateUrl: './txn-form.component.html',
  styleUrls: ['./txn-form.component.scss']
})

export class TxnFormComponent implements OnInit {
  form : FormGroup;
  allemployees : any[]=[];
  isModify    : boolean=false;
  selectedEmployee    : any;

  alltxntypes: any[]=[];
  typesarr : Type[]=[];

  selectedType : any;
  alltransanctions : any[]=[];
  txnAvailable : boolean = false;

  isSubmitted : boolean = false;

  constructor(private employeeService: EmployeeserviceService,
              private transactionService: TransactionsService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private router : Router,
              private activatedRoute: ActivatedRoute,    
              private fb: FormBuilder) { }

  ngOnInit(): void {  
    this._getEmployees(); 

    this.form = this.fb.group({
      txndate        : ['', [Validators.required]],
      txnamount      : ['',  [Validators.required]],
      txntype        : ['', [Validators.required]],
      description    : [''],
    });
  }

  _getEmployees() {
    this.employeeService.getAllEmployees().subscribe( response=> {
      if ( response.status ) {
        this.allemployees = response.employees;
        this._getTxntypes()
        this.addMessage(true, "EMployees Loaded")
      }
      err=>{ console.error("Error "+ response.message);
        this.addMessage(false, err);           }
      ()=> console.log("Completed!")
    })
  }

  _getTxntypes() {
    this.transactionService.getTxnTypes().subscribe( response=> {
      if ( response.status) {
        this.alltxntypes = response.txntypes;
        this._loadTxntypeDropdown();}
    })
  }

  _getTransactions(ID: string) {
    this.transactionService.getTransactionsByemployee(ID).subscribe( response=> {
      if ( response.status) {
        let la: any[];
        la = response.transactions;
        this.alltransanctions= [{ date: '2022-11-02', type: 'dd'}]
        this.alltransanctions.pop()

        la.forEach( (value) => {
            let tmp = new Date(value.txndate);
            let txt = tmp.getDate()+'-'+Number(tmp.getMonth()+1)+'-'+tmp.getFullYear()
            this.alltransanctions.push({ ID: value.ID, txndate: txt, amount: value.amount, txntype: value.typestr })
        })
        this.txnAvailable=true;
      }else this.txnAvailable=false;
    })
  }
    

  onSave() { 
    this.isSubmitted = true;

    if ( this.form.invalid)
    {
      return;
    }
    console.log("FORM IS VALID"); 
    const transaction = {
      employee : this.selectedEmployee.ID,
      txndate : this.transactionForm.txndate.value,
      txntype : this.transactionForm.txntype.value.id,
      amount : this.transactionForm.txnamount.value,
      description : this.transactionForm.description.value,
    }

    this.transactionService.addNewtransaction(transaction).subscribe( response => {
      if (response.status) {
        this._getTransactions(this.selectedEmployee.ID)
        console.log("Added tranasction log")
        this.addMessage(true, "Transaction Added successfully")
        this.form.reset()
      }
      else {
        console.log("Failed to add transaction")
        this.addMessage(false, response.message)
      }
    })
  }

  _loadTxntypeDropdown()
  {
    let tease : Type[]=[];
    this.alltxntypes.forEach( (value) => {
      console.log(value.ID+", "+value.txntype)
      tease.push( { name: value.txntype, id: value.ID})
    })

    this.typesarr = tease;
  }

  reconcileTxn(txn: any) {
    var txnobj: [number , number]
    console.log("Transaction ID "+JSON.stringify(txn))
    txnobj = [txn.ID, 0]

    const txnquery = {
      query : txnobj
    }

    this.transactionService.reconcileTransaction(txnquery).subscribe( response => {
      if (response.status) {
        this._getTransactions(this.selectedEmployee.ID)
        this.addMessage(true, "Transaction Reconciled successfully")
      }
      else {
        this.addMessage(false, response.message)
      }
    })
  }

  processForm(employee : any) {
    this._getTransactions(employee.ID);

    this.isModify=true;
    this.selectedEmployee = employee;
  }

  OnCancel() {
    this.isModify=false;
    this.alltransanctions = [];
  }

  addMessage(state: boolean, log: string) {
    this.messageService.add({
      severity: state ? 'success' : 'error',
      summary: state ? 'success' : 'error',
      detail: log
    })
  }

  get transactionForm() {
    return this.form.controls;
  }

}

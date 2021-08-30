import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params, Route } from '@angular/router';
import { global } from '../../../services/global.service';
import { UserService } from '../../../services/user.service';
import { Row } from '../../../models/row';
import { User } from '../../../models/user';
import { RowService } from '../../../services/row.service';
import { Budguet } from '../../../models/budguet';
import { BudguetService } from '../../../services/budguet.service';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client.service';
import { RowsByBudguetService } from '../../../services/rowsbybudguet';
import { RowsByBudguetPDFService } from '../../../services/rowsbybudguetPDF';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PdfMakeWrapper, Txt, Img, Table, Cell, Columns, Stack, Line, Canvas } from 'pdfmake-wrapper';
import { ITable } from 'pdfmake-wrapper/lib/interfaces';


interface DataResponse {

  amount: number;
  name: string;
  description: string;
  total: number;
}
type TableRow = [number, string, string, number];

export interface List {
  name: string;
  id: string;
}


@Component({
  selector: 'app-detail-budguet',
  templateUrl: './detail-budguet.component.html',
  styleUrls: ['./detail-budguet.component.css'],
  providers: [UserService, RowService, BudguetService, RowsByBudguetService, ClientService, RowsByBudguetPDFService],
})
export class DetailBudguetComponent implements OnInit {
  public page_title: string;
  public status: string;
  public budguet: Budguet;
  public client: Client;
  public clients: Array<Client>;
  public name;
  public id;
  public identity;
  public token;
  public departments;
  public budguets;
  public user: User;
  public loading: boolean;
  public row: Row;
  public rows;
  public id_budguet;
  public sum;
  public price;
  public tax;
  public price_status;
  public price_status_control;
  public data_client;
  public pdf_row;
  public pdf_columns;
  public total;

  public budguet_price: number;
  public budguet_tax: number;
  public budguet_total: number;

  myControl = new FormControl();
  options: List[] = JSON.parse(localStorage.getItem('client-list'))
  filteredOptions: Observable<List[]>;

  async generatePDF() {
    const pdf = new PdfMakeWrapper();
    const data = await this.Rows();


   // pdf.add(await new Img(this.user.image).fit([120, 50]).build());
    pdf.add(this.data());
    pdf.add(new Table([[(new Txt(["\n", "\n", "\n", "\n", "\n", "\n",]).end)],]).layout('noBorders').end);
    pdf.add(new Table([[
      (new Txt(['Numero de presupesto: ' + this.budguet.number_budguet]).end),
      (new Txt([]).end)],]).layout('noBorders').end);
    pdf.add(new Table([[
      (new Txt([]).end),
      (new Txt([]).end)],]).layout('noBorders').end);
    pdf.add(this.createTable(this.rows));
    pdf.add(new Table([[(new Txt(["\n", "\n", "\n", "\n",]).end)],]).layout('noBorders').end);

    const line = new Line([0, 0], [525, 0]).end;
    pdf.add(new Canvas([line,]).end);
    pdf.add(new Table([[
      (new Txt([]).end),
      (new Txt(['Precio: ' + this.budguet.price + "    |   Impuestos %: " + this.budguet.tax + "   |   Total: " + this.budguet.total]).alignment('right').fontSize(14).end)
    ],]).widths(['*', 300]).layout('noBorders').end);


    pdf.create().open();
  }
  data(): ITable {
    return new Table([[
      (new Txt([
        this.user.name, "\n",
        this.user.email, "\n",
        this.user.phone, "\n",
        this.user.web, "\n",
        this.user.address, "\n",
      ]).end),

      (new Txt([
        new Txt("Cliente").bold().fontSize(16).decoration('underline').end, "\n", "\n",
        new Txt(this.data_client.name).bold().fontSize(14).end, "\n",
        new Txt(this.data_client.data).italics().end, "\n", "\n",
        'Teléfono: ' + this.data_client.phone, "\n",
        this.data_client.email, "\n", "\n",
        'Dirección:', "\n", this.data_client.address, "\n",
      ]).alignment('right').fontSize(10).end)
    ],

    ]).widths(['*', 300]).layout('noBorders').end;
  }

  createTable(data: DataResponse[]): ITable {
    return new Table([
      ['CANTIDAD', 'REFERENCIA', 'DESCRIPCION', 'PRECIO'],
      ...this.extractData(data)
    ])
      .fontSize(11)
      .alignment('left')
      .layout('lightHorizontalLines')
      .end;
  }

  extractData(data: DataResponse[]): TableRow[] {
    return data.map(row => [row.amount, row.name, row.description, row.total]);
  }
  async Rows() {
    let rows_data = JSON.parse(localStorage.getItem('row-' + this.id_budguet + '-pdf-list'));
    let rows_json = JSON.stringify(rows_data);
    let rows = rows_json;
    return rows;
  }

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _budguetService: BudguetService,
    private _rowService: RowService,
    private _rowsByBudguetService: RowsByBudguetService,
    private _rowsByBudguetPDFService: RowsByBudguetPDFService,
    private _clientService: ClientService,
  ) {
    this.budguet = new Budguet(1, 1, 1, null, '', '', 1, 1, 1);
    this.row = new Row(1, 1, 1, 1, '', '', 1, 1, 1);
    this.client = new Client(1, 1, '', '', '', '', '', '', '');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.id_budguet = localStorage.getItem('budguet');
    this.budguet.id = this.id_budguet;
    this.user = this._userService.getIdentity();
    this.price_status = 'not';
    this.data_client = JSON.parse(localStorage.getItem('client-detail'));


  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.id = params['id'];
      this.getBudguetRows();
    });
    this.getBudguetRows();
    this.getBudguet();
    this.getClients();
    this._clientService.isBusy().subscribe(response => {
      this.loading = response;
    });
    this.getClient();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }



  getBudguetRows() {
    this.client = JSON.parse(localStorage.getItem('client-detail'));
    if(!this.client){
      localStorage.setItem('client-detail', JSON.stringify(
       { 'id': 1,
        'user_id':1,
        'name':'Nombre',
        'email':'email',
        'phone':'Telefono',
        'address':'Dirección',
        'data':'datos',
        'observations':'observaciones',
        'favorite':'not',}
      ));
      this.data_client = JSON.parse(localStorage.getItem('client-detail'));
    }
    let id = { "id": this.id };
    this._rowsByBudguetService.getList(this.token, id).subscribe(
      response => {
        this.rows = response;
        this.status = "success";
        localStorage.setItem('row-' + this.id + '-list', JSON.stringify(this.rows));
        this.loading = false;
        this.sum = JSON.stringify(this.rows);   
        let json = this.sum;
        let data = JSON.parse(json);
        this.total = 0;
        for (let x in data) {
          this.total += data[x].total;
        }
        this.budguet.price = this.total;
        this.budguet.total = ((this.budguet.price * this.budguet.tax)/100)+this.total;
      }, error => {
        console.error(error);
        this.status = "error";
      }
    );
    this._rowsByBudguetPDFService.getList(this.token, id).subscribe(
      response => {
        this.rows = response;
        this.status = "success";
        localStorage.setItem('row-' + this.id + '-pdf-list', JSON.stringify(this.rows));
        this.loading = false;
        this.pdf_row = this.rows;
        this.pdf_columns = [];
        for (let x of this.pdf_row) {
          this.pdf_row = ("['" + x.name + "'],['" + x.total + "'],");
          this.pdf_columns.push(this.pdf_row);
        }

      }, error => {
        console.error(error);
        this.status = "error";
      }
    );
  }

  updateRow(form) {
    this._rowService.update(this.token, form);
  }

  deleteRow(form) {
    this._rowService.deleteRow(this.token, form).subscribe(
      response => {
        if (response.status = 'success') {
          this.row = response.row;
          this.getBudguetRows();//para añadir cantidad de articulos de presupuesto a la navbar
          this.status = 'success';

        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    )
  }


  getBudguet() {
    let id = this.id;
    localStorage.removeItem('budguet');
    localStorage.setItem('budguet', id);
    this._budguetService.getBudguet(id).subscribe(
      response => {
        this.budguet = response.budguet;
        localStorage.setItem('budguet-detail', JSON.stringify(this.budguet));
        this.budguet = JSON.parse(localStorage.getItem('budguet-detail'));
        this.status = "success";
      }, error => {
        console.error(error);
        this.status = "error";
      }
    );

  }

  getClients() {
    this.loading = true;
    this._clientService.getList(this.token, this.identity).subscribe(
      response => {
        this.clients = response;
        this.status = "success";
        this.loading = false;
        localStorage.setItem('client-list', JSON.stringify(this.clients));
        this.options = JSON.parse(localStorage.getItem('client-list'));
      }, error => {
        console.error(error);
        this.status = "error";
      }
    )
  }

  getClient() {
    let id = this.id;
    localStorage.removeItem('budguet');
    localStorage.setItem('budguet', id);
    this._budguetService.getBudguet(id).subscribe(
      response => {
        this.budguet = response.budguet;
        localStorage.setItem('budguet-detail', JSON.stringify(this.budguet));
        this.budguet = JSON.parse(localStorage.getItem('budguet-detail'));
        this.status = "success";
        let budguet = JSON.parse(localStorage.getItem('budguet-detail'));
        this.getBudguetRows();
        let client_id = budguet.client_id;
        if (client_id != null) {
          this._clientService.getClient(client_id).subscribe(
            response => {
              this.client = response.client;
              localStorage.setItem('client-detail', JSON.stringify(this.client));
              this.status = "success";
            }, error => {
              console.error(error);
              this.status = "error";
            }
          );
        }
      }, error => {
        console.error(error);
        this.status = "error";
      }
    );

  }

  updateClient(form) {
    this._clientService.update(this.token, form);
  }

  updateBudguet(form) {
    this.loading=true;
    this._budguetService.update(this.token, form);
    let id = this.id;
    this._budguetService.getBudguet(id).subscribe(
      response => {
        this.budguet = response.budguet;
        localStorage.setItem('budguet-detail', JSON.stringify(this.budguet));
        this.getClient();
        this.status = "success";
        this.loading=false;
      }, error => {
        console.error(error);
        this.status = "error";
      }
    );
  }

  private _filter(name: string): List[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  displayCompany(id): string {
    if (!id || this.options === null || this.options === undefined) {
      return '';
    } else {
      let index = this.options.findIndex(option => option.id === id);
      if (index > -1) {
        return this.options[index].name;
      } else { return ''; }
    }
  }

  addTotalsRows() {
    this.getBudguetRows();
    this.sum = localStorage.getItem('row-' + this.id_budguet + '-list');   
    let json = this.sum;
    let data = JSON.parse(json);
    this.total = 0;
    for (let x in data) {
      this.total += data[x].total;
    }
    this.budguet.price = this.total;
  }

  saveAndClose(form) {
    this._budguetService.update(this.token, form);
    localStorage.removeItem('row-' + this.id_budguet + '-list');
    localStorage.removeItem('row-' + this.id_budguet + '-hash');
    localStorage.removeItem('row-' + this.id_budguet + '-pdf-list');
    localStorage.removeItem('budguet-detail');
    localStorage.removeItem('budguet');
    this._router.navigate(['home']);
  }

  addTotalsPDFRows() {
    let rows = localStorage.getItem('row-' + this.id_budguet + '-list');
    this.pdf_row = JSON.parse(rows);
    this.pdf_columns = [];
    for (let x of this.pdf_row) {
      this.pdf_row = ("['" + x.name + "'],['" + x.total + "'],");
      this.pdf_columns.push(this.pdf_row);
    }
  }

  taxCalc(){
    this.budguet.total = ((this.budguet.price * this.budguet.tax)/100)+this.total;
  }
}

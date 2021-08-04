import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { ApiService } from 'src/app/servicios/api.service';
import { Utils } from 'src/app/utils/Utils';
import { PdfMakeWrapper, Txt, Img } from 'pdfmake-wrapper';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { rendererTypeName } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';

PdfMakeWrapper.setFonts(pdfFonts);

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-show-libdiario',
  templateUrl: './show-libdiario.component.html',
  styleUrls: ['./show-libdiario.component.css']
})

export class ShowLibdiarioComponent implements OnInit {
  @Inject(DOCUMENT) document


  public var = 2

  xd: HTMLElement;
  public classEval = {


    "style-1": this.var = 10,
    "style-2": this.var < 10
  }
  data: SafeHtml;
  logoDataUrl: string;


  constructor(private service: ApiService, private sanitizer: DomSanitizer, private rutaActiva: ActivatedRoute) { }
  @Input() lib: any;

  id_libdiario: string;
  fechini_libdiario: string;
  fechfin_libdiario: string;
  nume_libdiario: string;
  ActivarbtnPDF
  id_ast: number;

  @Output() ast: any = [];
  dato_search: string = "";
  dato_select: string = "";

  @Output() trans: any = [];
  LibrosList: any = [];
  AsientosList: any = [];
  AdminAction: string;
  ModalTitle: string;
  ActivatedAddEditLibComp: boolean = false;
  ActivatedReport: boolean = false;
  ActivatedAddEditAstComp: boolean = false;

  Libros: any;

  fmes: string;
  totalDebe: number;
  totalHabe: number;
  ActivarTablaLib:boolean=false;


  ngOnInit(): void {
    this.AdminAction = "Buscar datos";

  }

  getFor(item) {
    var tdebe = 0;
    var thabe = 0;

    for (let i = 0; i < item.length; i++) {
      tdebe = tdebe + item[i].debe_transaccion;
      thabe = thabe + item[i].habe_transaccion;
    }
    this.totalDebe = tdebe;
    this.totalHabe = tdebe;
  }
  refreshLibrosList() {
    this.id_libdiario = this.lib.id_libdiario;
    this.fechini_libdiario = this.lib.id_libdiario;
    this.fechfin_libdiario = this.lib.id_libdiario;
  }

  buscarClick2(item) {
    this.ActivarTablaLib=true;
    this.ActivarbtnPDF = false;
    this.service.searchLibroMes(this.dato_select).subscribe(data => {
      if (data == "Dato no encontrado") { this.LibrosList = "Sin datos" }
      else { this.LibrosList = data; }
    });
  }

  loadLibDiario() {
    this.service.searchLibroMes(this.dato_select).subscribe(data => {
      if (data == "Dato no encontrado") { this.LibrosList = "Sin datos" }
      else { this.LibrosList = data; }
      console.log("datos data ");
      console.log(data);
    });
  }


  buscarClick(item) {
    console.log("fechas del reorte");
    console.log(this.fechini_libdiario, this.fechfin_libdiario);
    this.service.searchLibro(this.dato_search).subscribe(data => {
      if (data == "Dato no encontrado" || this.fechini_libdiario == null) { this.LibrosList = " " }
      else { this.LibrosList = data; }
    });
  }

  addAasientoClick() {
    this.ast = {
      id_asientos: 0,
      obse_asientos: ""
    }
    this.ModalTitle = "Nuevos datos";
    this.ActivatedAddEditAstComp = true;
  }

  detalleTransaccionesClick(item) {

    this.service.getTransaccionesId(item.id_libdiario).subscribe(data => {
      this.trans = data;
      console.log("Search Transacciones");
      console.log(this.trans);
    });
  }
  detalleAsientosClick(item) {
    this.ActivarbtnPDF = true;
    this.ModalTitle = "Contenido datos";
    this.service.buscarAsientosId(item.id_libdiario).subscribe(data => {
      this.ast = data;
      this.id_ast = this.ast.id_asientos;
      this.Libros = item;
      this.getFor(this.ast);
    });

  }


  refreshCuentasList() {
    this.service.getCuentaList().subscribe(data => {
      this.LibrosList = data;
    });
  }

  refreshSearch() {
    this.service.searchCuenta(this.dato_search).subscribe(data => {
      if (data == "Dato no encontrado") { this.LibrosList = " " }
      else { this.LibrosList = data; }
    });
  }

  /* --- PRUEBAS PDF */
  openFreeStyle() {
    const documentDefinition = {
      content: [
        'Texto libre',

        { text: 'Texto personalizado', fontSize: 30, alignment: 'right', bold: true }
      ]
    };
    pdfMake.createPdf(documentDefinition).open();
  }

  openPdfStyle() {
    const documentDefinition = {
      content: [
        // if you don't need styles, you can use a simple string to define a paragraph
        'This is a standard paragraph, using default style',

        // using a { text: '...' } object lets you set styling properties
        { text: 'This paragraph will have a bigger font', fontSize: 15 },

        // if you set pass an array instead of a string, you'll be able
        // to style any fragment individually
        {
          text: [
            'This paragraph is defined as an array of elements to make it possible to ',
            { text: 'restyle part of it and make it bigger ', fontSize: 40 },
            'than the rest.'
          ]
        }
      ]
    };
    pdfMake.createPdf(documentDefinition).open();
  }

  openPdfStyleDict() {
    const documentDefinition = {
      content: [
        { text: 'This is a header', style: 'header' },
        'No styling here, this is a standard paragraph',
        { text: 'Another text', style: 'anotherStyle' },
        { text: 'Multiple styles applied', style: ['header', 'anotherStyle'] }
      ],

      styles: {
        header: {
          fontSize: 10,
          bold: true
        },
        anotherStyle: {
          fontSize: 100,
          italic: true,
          alignment: 'right'
        }
      }
    };
    pdfMake.createPdf(documentDefinition).open();
  }

  openPdfColumns() {
    const documentDefinition = {
      content: [
        'This paragraph fills full width, as there are no columns. Next paragraph however consists of three columns',
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: 'First column'
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '*',
              text: 'Second column'
            },
            {
              // fixed width
              width: 100,
              text: 'Third column'
            },
            {
              // percentage width
              width: '10%',
              text: 'Last column'
            }
          ],
          // optional space between columns
          columnGap: 10
        },
        'This paragraph goes below all columns and has full width'
      ]
    };
    pdfMake.createPdf(documentDefinition).open();
  }

  openPdfTables() {
    const documentDefinition = {
      content: [
        {
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ['*', 'auto', 100, 50, '*'],

            body: [
              ['First22', 'Second', 'Third', 'The last one', '5bfs'],
              ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'vs2'],
              [{ text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4', 'va22']
            ]
          }
        }
      ]
    };
    pdfMake.createPdf(documentDefinition).open();
  }

  openPdfLists() {
    const documentDefinition = {
      content: [
        'Bulleted list example:',
        {
          // to treat a paragraph as a bulleted list, set an array of items under the ul key
          ul: [
            'Item 1',
            'Item 2',
            'Item 3',
            { text: 'Item 4', bold: true },
          ]
        },

        'Numbered list example:',
        {
          // for numbered lists set the ol key
          ol: [
            'Item 1',
            'Item 2',
            'Item 3'
          ]
        }
      ]
    };
    pdfMake.createPdf(documentDefinition).open();
  }

  async openPdfHeadersAndFootersStatic() {
    const documentDefinition = {
      header: {
        rowSpan: 3,
        columns: [
          {

            // auto-sized columns have their widths based on their content
            image: await this.getBase64ImageFromURL(
              "assets/img/app/espoch-sello.png"
            )
          },
          {
            // star-sized columns fill the remaining space
            // if there's more than one star-column, available width is divided equally
            width: '*',
            text: 'Second column',
          },
          {
            // fixed width
            width: '*',
            text: 'Third column'
          }
        ],
        // optional space between columns
        border: [true, true, true, true],
        columnGap: 10
      },

      footer: {
        columns: [
          'Left part',
          { text: 'Right part', alignment: 'right' }
        ]
      },
      /*  content: 'This is an sample PDF printed with pdfMake' */
    };
    pdfMake.createPdf(documentDefinition).open();
  }

  openPdfHeadersAndFootersDynamic() {
    const documentDefinition = {
      footer: function (currentPage, pageCount) { return currentPage.toString() + ' of ' + pageCount; },
      header: function (currentPage, pageCount) {
        // you can apply any logic and return any valid pdfmake element

        return { text: 'simple text', alignment: (currentPage % 2) ? 'left' : 'right' };
      },
      content: 'This is an sample PDF printed with pdfMake'
    };

    pdfMake.createPdf(documentDefinition).open();

  }

  openPdfBackgroundLayer() {
    // The background-layer will be added on every page.
    var documentDefinition = {
      // background: 'simple text',
      background: function (currentPage) {
        return 'simple text on page ' + currentPage
      },
      content: 'This is an sample PDF printed with pdfMake'
    };
    pdfMake.createPdf(documentDefinition).open();

  }

  openPdfMargins() {
    const documentDefinition = {
      content: [
        'This is a standard paragraph, using default style',

        // margin: [left, top, right, bottom]
        { text: 'sample', margin: [5, 2, 10, 20] },

        // margin: [horizontal, vertical]
        { text: 'another text', margin: [5, 2] },

        // margin: equalLeftTopRightBottom
        { text: 'last one', margin: 5 }

      ]
    };
    pdfMake.createPdf(documentDefinition).open();

  }


  openPdfStackOfParagrahps() {
    var documentDefinition = {
      content: [
        'paragraph 1',
        'paragraph 2',
        {
          columns: [
            'first column is a simple text',
            {
              stack: [
                // second column consists of paragraphs
                'paragraph A',
                'paragraph B',
                'these paragraphs will be rendered one below another inside the column'
              ],
              fontSize: 15
            }
          ]
        }
      ]
    };
    pdfMake.createPdf(documentDefinition).open();
  }
  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0); //Posicion de la imgane
        var dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };
      img.onerror = error => {
        reject(error);
      };
      img.src = url;
    });
  }

  async printDoc() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const employees = [
      { "firstName": "John", "lastName": "Doe" },
      { "firstName": "Anna", "lastName": "Smith" },
      { "firstName": "Peter", "lastName": "Jones" }
    ];
    const document = { content: [{}] }


    employees.forEach(employee => {
      document.content.push({
        columns: [
          { text: 'firstname', width: 60 },
          { text: ':', width: 10 },
          { text: employee.firstName, width: 50 },
          { text: 'lastName', width: 60 },
          { text: ':', width: 10 },
          { text: employee.lastName, width: 50 }
        ]
      });
    });
    var headers = {
      fila_0: {
        col_1: { text: 'Faltas', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [0, 8, 0, 0] },
        col_2: { text: 'Fecha', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [0, 8, 0, 0] },
        col_3: { text: 'Descripción', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [0, 8, 0, 0] },
        col_4: { text: 'Cita con acudientes', style: 'tableHeader', colSpan: 2, alignment: 'center' }
      }
    }

    var body = [];
    for (var key in headers) {
      if (headers.hasOwnProperty(key)) {
        var header = headers[key];
        var row = new Array();
        row.push(header.col_1);
        row.push(header.col_2);
        row.push(header.col_3);
        row.push(header.col_4);
        row.push(header.col_5);
        body.push(row);
      }
    }
    for (var key in this.ast) {
      if (this.ast.hasOwnProperty(key)) {
        var data = this.ast[key];
        var row = new Array();
        row.push(data.id_asientos);
        row.push(data.fech_asientos);
        row.push(data.parc_transaccion);
        row.push(data.debe_transaccion);
        row.push(data.habe_transaccion);
        body.push(row);
      }
    }

    var dd = {
      header: {
        rowSpan: 3,
          widths: ['47', '*', '50'],
          columns: [
            {
              width: 40,
              image: await this.getBase64ImageFromURL(
                "assets/img/app/espoch-sello.png"
              )
            },
            {
              margin: [50, 0],
              text: [
                { text: 'ESPOCH2  \n', fontSize: 24, bold: true },
                { text: 'ESCUELA SUPERIOR POLITÉCNICA DE CHIMBORAZO \n\n', fontSize: 12 }
                /*   { text: 'Asociación de Profesores Politécnicos de Chimborazo ', style: 'titulo'}, */

                /* { text: 'ASOCIACIÓN DE PROFESORES POLITÉCNICOS DE CHIMBORAZO', style: 'titulo'} */
              ],
            },
            {
              width: 50,
              image: await this.getBase64ImageFromURL(
                "assets/img/app/appoch.png"
              )
            }
          ]
      },
      footer: function (currentPage, pageCount) {
        return { text: 'Pagina ' + currentPage.toString() + ' de ' + pageCount, alignment: 'center', margin: [0, 30, 0, 0] };
      },
      content: [
        //{ text: 'Tables', style: 'header' },
        '\nEl estudiante AGRESOTH NEGRETE JORYETH TATIANA - 901 - TARDE tiene 1 actas, con 1 faltas acomuladas y a manera de resumen descritas a continuación:\n\n',
        //{ text: 'A simple table (no headers, no width specified, no spans, no styling)', style: 'sta' },
        //'The following table has nothing more than a body array',
        {
          style: 'tableExample',
          table: {
            widths: ['*', '*', '*', '*', '*'],
            headerRows: 2,
            // keepWithHeaderRows: 1,   
            body: body
          }
        },  //this.totalDebe = tdebe;.
        {text: 'Totales'+this.totalDebe, style: 'styleTablasHeader', alignment: 'center' },
        {
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ['*', 'auto', 100, 50, '*','auto'],

            body: [
              ['First22', 'Second', 'Third', 'The last one', '5bfs', '5bfs'],
              ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'vs2', 'vs2'],
              [{ text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4', 'va22', 'va22']
            ]
          }
        },
      ],
      styles: {
        header: {
          fontSize: 28,
          bold: true
        },
        subheader: {
          fontSize: 15,
          bold: true
        },
        quote: {
          italics: true
        },
        small: {
          fontSize: 8
        },
        sta: {
          fontSize: 11,
          bold: false,
          alignment: 'justify'
        }
      }
    }



    let dd2 = {

      // Here you put the page settings as your footer, for example:
      footer: function (currentPage, pageCount) {
        return [
          {
            text:
              currentPage.toString() +
              " de " +
              pageCount +
              "\n" +
              "Footer Name",
            alignment: currentPage ? "center" : "center"
          }
        ];
      },
      // Here you can enter the page size and orientation:
      pageSize: "A4",
      pageOrientation: "Portrait",
      //in pageOrientation you can put "Portrait" or "landscape"

      // start the body of your impression:
      content: [

        {
          table: {
            widths: ['auto'],

            body: [
              [
                {/* res.table[0].id_user */
                  text: [
                    { text: `${this.ast[0].id_asientos}`, bold: true },
                    { text: `${this.ast[0].fech_asientos}`, bold: true }
                  ],
                  style: "header",
                  width: "50",
                  alignment: "left",
                  border: [true, true, true, true],
                  margin: [0, 15, 0, 15]
                }
              ]
            ]
          }
        },
      ]

    }

    pdfMake.createPdf(dd).open();
  }



  /*-------------------------------------------------  PDF  */


  async showPdf() {

    let docDefinition = {

      header: {
        rowSpan: 3,
        margin: [20, 20],
        widths: ['*', '*', 'auto'],
        columns: [

          {

            // auto-sized columns have their widths based on their content
            image: await this.getBase64ImageFromURL(
              "assets/img/app/espoch-sello.png"
            ),


          },
          {
            // star-sized columns fill the remaining space
            // if there's more than one star-column, available width is divided equally

            text: 'Second column',
            border: [true, true, false, false]
          },
          {
            // fixed width

            image: await this.getBase64ImageFromURL(
              "assets/img/app/espoch-sello.png"
            ),
          }
        ],
        // optional space between columns


      },

      footer: {
        columns: [
          'Left part',
          { text: 'Right part', alignment: 'right' }
        ]
      },
      content: [
        {
          text: 'ESPOCH', margin: [45, 0],
          fontSize: 24
        },
        {

        }
      ]
    };
    pdfMake.createPdf(docDefinition).open();
  }

  async showPdf2() {
    var headers = {
      fila_0: {
        col_1: { text: 'Asiento', style: 'styleTablasHeader', alignment: 'center' },
        col_2: { text: 'Fecha', style: 'styleTablasHeader', alignment: 'center' },
        col_3: { text: 'Detalle', style: 'styleTablasHeader', alignment: 'center'},
        col_4: { text: 'Parcial', style: 'styleTablasHeader', alignment: 'center' },
        col_5: { text: 'Debe', style: 'styleTablasHeader', alignment: 'center' },
        col_6: { text: 'Haber', style: 'styleTablasHeader', alignment: 'center' }
      }
    
    }

    var body = [];
    for (var key in headers) {
      if (headers.hasOwnProperty(key)) {
        var header = headers[key];
        var row = new Array();
        row.push(header.col_1);
        row.push(header.col_2);
        row.push(header.col_3);
        row.push(header.col_4);
        row.push(header.col_5);
        row.push(header.col_6);
        body.push(row);
      }
    }
    for (var key in this.ast) {
      if (this.ast.hasOwnProperty(key)) {
        var data = this.ast[key];
        var row = new Array();
        row.push(data.id_asientos);
        row.push(data.fech_asientos);
        row.push(data.deta_transaccion);
        row.push(data.parc_transaccion);
        row.push(data.debe_transaccion);
        row.push(data.habe_transaccion);
        body.push(row);
      }
    }

    var docDefinition = {

      footer: function (currentPage, pageCount) {
        return [
          {
            text:
              "Página "+currentPage.toString() +
              " de " +
              pageCount +
              "\n" +
              "", style: 'styleTablasBody',
            alignment: currentPage ? "center" : "center"
          }
        ];
      },
      content: [
        {
          rowSpan: 3,
          widths: ['47', '*', '50'],
          columns: [
            {
              width: 40,
              image: await this.getBase64ImageFromURL(
                "assets/img/app/espoch-sello.png"
              )
            },
            {
              margin: [10, 0],
              text: [

                { text: 'ESPOCH  \n', fontSize: 24, bold: true },
                { text: 'ESCUELA SUPERIOR POLITÉCNICA DE CHIMBORAZO \n\n', fontSize: 12 }
                /*   { text: 'Asociación de Profesores Politécnicos de Chimborazo ', style: 'titulo'}, */

                /* { text: 'ASOCIACIÓN DE PROFESORES POLITÉCNICOS DE CHIMBORAZO', style: 'titulo'} */
              ],
            },
            {
              width: 50,
              image: await this.getBase64ImageFromURL(
                "assets/img/app/appoch.png"
              )
            }
          ],
          //jcdiazo@espoch.edu.ec///
          //jueves tarde  en la noche////

        }, { text: 'ASOCIACIÓN DE PROFESORES POLITÉCNICOS DE CHIMBORAZO', style: 'titulo' },
        , { text: 'LIBRO DIARIO \nDEL ' + this.LibrosList[0].fechini_libdiario + ' AL ' + this.LibrosList[0].fechfin_libdiario + '\n\n', style: 'styleReporAction' },
        {
          style: 'styleTablasBody',
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            widths: [40, 65, '*',55, 55,55],
            headerRows: 1,
            body: body
          }
        },
        {
          style: 'styleTablasHeader',
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ['*', 55,55],

            body: [
              ['TOTALES',this.totalDebe, this.totalHabe]
            ]
          }
        },
      ],
      styles: {
        titulo: {
          fontSize: 13,
          bold: true,
          //background: '#129149',
          alignment: 'center'
          //color:'#fff'
        },
        styleReporAction: {
          fontSize: 11,
          bold: true,
          alignment: 'center'
        },
        styleTablasHeader: {
          bold: true,
          fontSize: 11,
          italic: true,
          alignment: 'center'
        },
        debe_transaccion: {
          fontSize: 11,
          alignment: 'right'
        },
        styleTablasBody: {
          fontSize: 11,
          alignment: 'justify'
        }
      },


    };
    pdfMake.createPdf(docDefinition).open();
  }
  async showPdf3() {
    var headers = {
      fila_0: {
        col_1: { text: 'Faltas', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [0, 8, 0, 0] },
        col_2: { text: 'Fecha', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [0, 8, 0, 0] },
        col_3: { text: 'Descripción', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [0, 8, 0, 0] },
        col_4: { text: 'Cita con acudientes', style: 'tableHeader', colSpan: 2, alignment: 'center' }
      }
    
    }


    var docDefinition = {

      footer: function (currentPage, pageCount) {
        return [
          {
            text:
              currentPage.toString() +
              " de " +
              pageCount +
              "\n" +
              "", style: 'styleTablasBody',
            alignment: currentPage ? "center" : "center"
          }
        ];
      },
      content: [
        {
          rowSpan: 3,
          widths: ['47', '*', '50'],
          columns: [
            {
              width: 40,
              image: await this.getBase64ImageFromURL(
                "assets/img/app/espoch-sello.png"
              )
            },
            {
              margin: [10, 0],
              text: [

                { text: 'ESPOCH  \n', fontSize: 24, bold: true },
                { text: 'ESCUELA SUPERIOR POLITÉCNICA DE CHIMBORAZO \n\n', fontSize: 12 }
                /*   { text: 'Asociación de Profesores Politécnicos de Chimborazo ', style: 'titulo'}, */

                /* { text: 'ASOCIACIÓN DE PROFESORES POLITÉCNICOS DE CHIMBORAZO', style: 'titulo'} */
              ],
            },
            {
              width: 50,
              image: await this.getBase64ImageFromURL(
                "assets/img/app/appoch.png"
              )
            }
          ],
          //jcdiazo@espoch.edu.ec///
          //jueves tarde  en la noche////

        }, { text: 'ASOCIACIÓN DE PROFESORES POLITÉCNICOS DE CHIMBORAZO', style: 'titulo' },
        , { text: 'LIBRO DIARIO \nDEL ' + this.LibrosList[0].fechini_libdiario + ' AL ' + this.LibrosList[0].fechfin_libdiario + '\n\n', style: 'styleReporAction' },
        {
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            widths: [55, '*', 55, 55, 55],
            headerRows: 1,

            body: [
              [{ text: 'Fecha', style: 'styleTablasHeader' }, { text: 'Detalle', style: 'styleTablasHeader' }, { text: 'Parcial', style: 'styleTablasHeader' }, { text: 'Debe', style: 'styleTablasHeader' }, { text: 'Haber', style: 'styleTablasHeader' }],
              [{
                text: [
                  { text: `${this.ast[0].fech_asientos}`, style: 'styleTablasBody' }]
              }, {
                text: [
                  { text: `${this.ast[0].deta_transaccion}`, style: 'styleTablasBody' }]
              }, {
                text: [
                  { text: `${this.ast[0].parc_transaccion}`, style: 'styleTablasBody' }]
              }, {
                text: [
                  { text: `${this.ast[0].debe_transaccion}`, style: 'styleTablasBody' }]
              }, {
                text: [
                  { text: `${this.ast[0].habe_transaccion}`, style: 'styleTablasBody' }]
              }]
            ]
          }
        },

      ],
      styles: {
        titulo: {
          fontSize: 13,
          bold: true,
          //background: '#129149',
          alignment: 'center'
          //color:'#fff'
        },
        styleReporAction: {
          fontSize: 11,
          bold: true,
          alignment: 'center'
        },
        styleTablasHeader: {
          bold: true,
          fontSize: 10,
          italic: true,
          alignment: 'center'
        },
        styleTablasBody: {
          fontSize: 10,
          italic: true,
          alignment: 'center'
        }
      },


    };
    pdfMake.createPdf(docDefinition).open();
  }


  openPdfImages() {
    var dd = {
      pageMargins: [10, 10, 10, 10],
      header: {
        columns: [
          {
            // usually you would use a dataUri instead of the name for client-side printing
            // sampleImage.jpg however works inside playground so you can play with it
            image: this.logoDataUrl
          }
        ]
      },
      content: [
        'Here goes your content',
      ],
    }
    // JPEG and PNG formats are supported.
    var documentDefinition = {
      content: [
        {
          // you'll most often use dataURI images on the browser side
          // if no width/height/fit is provided, the original size will be used
          image: this.logoDataUrl
        },

        //{
        // under NodeJS (or in case you use virtual file system provided by pdfmake)
        // you can also pass file names here
        //  image: 'myImageDictionary/image1.jpg'
        //}
      ],

      images: {
        mySuperImage: 'data:image/jpeg;base64,...content...'
      }
    };
    pdfMake.createPdf(dd).open();
  }


}

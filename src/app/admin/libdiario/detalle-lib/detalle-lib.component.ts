import { DecimalPipe, DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';


import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-detalle-lib',
  templateUrl: './detalle-lib.component.html',
  styleUrls: ['./detalle-lib.component.css']
})
export class DetalleLibComponent implements OnInit {

  constructor(private service: ApiService, private rutaActiva: ActivatedRoute) {

  }
  @Input() lib: any = [];
  ast: any = [];
  @Input() trans: any = [];

  @Input() libAsiento: any = [];
  @Input() debe: any;


 
  fechini_libdiario: string;
  fechfin_libdiario: string;
  nume_libdiario: string;

  id_asiento:string;
  id_libdiario: string;
  fech_asiento:string;
  obse_asiento:string;

  totalDebe: number = 0;
  totalHabe: number = 0;

  LibrosList: any = [];
  AsientosList: any = [];
  Transacciones: any = [];
  SubGrupoCuentasList: any = [];

  ModalTitle: string;
  verGrupo: any;
  verSubGrupo: any;

  @Input() dato_id:string;
  @Input() id_ast: number;

  resp: any;
  max: any;
  p: number = 1;
  ActivatedAddEditLibComp: boolean = false;
  ActivatedAddEditAstComp: boolean = false;
  ActivarListaAsientos:boolean=false;
  variable:string;

  ngOnInit(): void {
    this.refreshAstList();
    this.ModalTitle = "Libro DIARIO ";
    this.dato_id='498';
    
  }

  


  loadAsientos(item) {
    this.service.getAsientosId(item).subscribe((data: any) => {
      this.AsientosList = data;
    });
    
  }
  //-----------------------------------------------
  addAstClick() {
    this.ast = {
      id_asientos: 0,
    }
    this.ModalTitle = "Nuevos ASIENTOS";
    this.ActivatedAddEditAstComp = true;
  }

  deleteAsientosClick(item:any) {
    if (confirm("Esta seguro?")) {
      this.service.deleteAsiento(item.id_asientos).subscribe(data => {
        alert(data.toString());
      });
    }
  }

  updateAst() {
    var val = {
      id_cuentas: this.id_libdiario,
      fechini_libdiario: this.fechini_libdiario,
      fechfin_libdiario: this.fechfin_libdiario,
      nume_libdiario: this.nume_libdiario
    };
    this.service.updateCuenta(val).subscribe(res => {
      alert(res.toString());
    });
  }

  closeAstClick() {
    this.ActivatedAddEditLibComp = false;
    this.refreshAstList();
  }

  refreshAstList() {
    this.variable=this.rutaActiva.snapshot.params.id;
    this.ActivarListaAsientos=true;
    this.service.getAsientosId(this.variable).subscribe(data => {
      this.ast = data;
      console.log("REfres aSientos Array");
      console.log(this.ast);
    });
  }
  //-----------------------------------------------


  loadSubGrupocuentas() {
    this.service.getSubGrupoCuentas(this.id_libdiario).subscribe((data: any) => {
      this.SubGrupoCuentasList = data;
    });
  }

  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.service.getIdLibros().subscribe((data: any) => {
      this.resp = data[0].id_libdiario;

      if (this.resp == null) {
        this.max = 1;
      }
      else {
        this.max = this.resp + 1;
      }

      this.nume_libdiario = this.max;
    });

  }

  addLibros() {
    var val = {
      id_libdiario: this.id_libdiario,
      fechini_libdiario: this.fechini_libdiario,
      fechfin_libdiario: this.fechfin_libdiario,
      nume_libdiario: this.nume_libdiario
    };
    this.service.addLibro(val).subscribe(res => {
      alert(res.toString());
    });
  }

  updateLibros() {
    var val = {
      id_libdiario: this.id_libdiario,
      fechini_libdiario: this.fechini_libdiario,
      fechfin_libdiario: this.fechfin_libdiario,
      nume_libdiario: this.nume_libdiario
    };
    this.service.updateLibro(val).subscribe(res => {
      alert(res.toString());
    });
  }

  /*------------- */
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
    var datos = this.AsientosList;

    const documentDefinition = {
      content: [
        { text: 'This paragraph will have a bigger font', fontSize: 15 },
        { text: 'This is a header', style: 'header' },
        'No styling here, this is a standard paragraph',
        { text: 'Another text', style: 'anotherStyle' },

        {

          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ['auto', 'auto', 100, '*'],

            body: [
              ['First', 'Second', 'Third', 'The last one'],
              ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
              /* ['Value 1', 'Value 2', 'Value 3', 'Value 4'], */
              [{
                text: [
                  { text: `${this.ast[0].id_asientos}`, bold: true }]
              }, 'Val 2', 'Val 3', 'Val 4']
            ]
          }
        }
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

  /*--------------- */

  printDoc() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    let dd = {

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
}

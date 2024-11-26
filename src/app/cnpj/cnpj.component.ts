import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { CnpjService } from './cnpj.service';

@Component({
  selector: 'app-cnpj',
  templateUrl: './cnpj.component.html',
  styleUrls: ['./cnpj.component.css']
})
export class CnpjComponent implements OnInit {
  @Input() titleHome = 'Consultando cnpj';

  buscacnpj: string = '';
  buscar: boolean = false;
  constructor(
    private cnpjService: CnpjService,
    private messageService: MessageService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Buscando cnpj');
  }

  buscarCNPJ(buscacnpj: any, form: any) {
    if (buscacnpj !== null && buscacnpj !== '' && buscacnpj >= 8) {
      this.cnpjService.consultaCNPJ(buscacnpj).subscribe({
        next: (dados: any) => {
          this.buscar = true;
          setTimeout(() => {
            this.populacnpjForm(dados, form);
            console.log('cheguei aqui');
          }, 100);
        },
        error: (e: any) => {
          this.resetacnpjForm(form);
          this.buscar = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Atenção',
            detail: 'Erro ao busca cnpj!'
          });
        }
      })
    }
  }

  populacnpjForm(dados: any, formulario: any) {
    console.log('entrei no populacnpj');
    console.log('dados antes', dados);
    formulario.form.patchValue({
      nome: dados.razao_social,
      bairro: dados.bairro
    })
    console.log('dados depois', dados);
  }

  resetacnpjForm(formulario: any) {
    formulario.form.patchValue({
      nome: null,
      bairro: null
    })
    this.buscar = false;
  }
}

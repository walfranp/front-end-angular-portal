import { Component, OnInit } from '@angular/core';
import { ExtratoService } from '../services/extrato/extrato.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
	selector: 'app-gastos-saude',
	templateUrl: './gastos-saude.component.html',
	styleUrls: ['./gastos-saude.component.css']
})
export class GastosSaudeComponent implements OnInit {

	logo_base_64 = "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAFEAAABLCAYAAAAIwmvLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAABJeSURBVHja7JxpcFTXmYafc8693a1Wa0EICTCrzQ4CjG0MBhMbG7DBS9gc8CRxJpNkkqmaqqnKz1mrZn5N1VSlppJJZSZxZhwbsImBmM0YG8fGQDC7AEkWNpgdSYDWVi/33nPmx2ktGA9IjQTC41vFH6RW3/Oe73u/91vOEcYYw9fPLT2yL79c3Dd8dEVzKan7NIhOX3ypwMDhRs2qS4LLniQkYGmJ5rH+gogSfe59RV9z5xMtmo11cDQucQApwACegSFhw3MDDPcXSBzxNYjXPVfSmvU1sLtRIqAdJOGACQBjLTQAxkUNy0oNI6MSKb4GkWbPsLPesKFO4htwO4GHguDqFWR+f4QCk7Y/8421zpn5mudKoDQi/3+CqA3sa9CsrRFc8QWuAAEgQOZAUN9M47tv0rLnHSKjJ1P4zLcJDR2CTmHNMePijoBFxZp5/QXRO+TjdwTEk3HNxstwuFmiACUseCJko0rr4V00bFlN+vMqUArj+zjFgyiYt4zYrKdRuRF0GtDWItMGhoUNi0sMU/Jvv4vfVhAb0oZNl2HHVXEt77nWfRNVx2jcsppE5X7QGhGKtH/W+B7G9wgPG0PBghfIfegxhCPQyY6I7gNTYoZlJYahUfnVAjHuG/Y0GNbVSpK6E+8pa33exQs0vbue5l1vo9MJZCgC4svNyXgpMIbo5EcoWLCcyJhJGA3G6+BLgDmFhkUDoDgs7m4QtYEjTZo1lwQ1niDUxnsSZBiC5laad2yg6Y9/wK+vQ4YjINXN/7Ax6FQCGY6SO/1xCp9egTtoMCZtI3mbJIpI+OYAzTeKeldf9gqIJsN762oFx+MCN6P3EBY8nfJpPfAhje+8Qep0NcINIZxQ5pPd2aUAnUrgFJWSP3cxeXMWofJjNvjoDjBLXcOSUsP9+RJX3gUg1qU0b18WvF9/Pe8hIFlVTsOWVSQqDyCEQITCt75pvge+hzvkPgqfWkn0gTmIsMJ04ssAGBs1rBhoGNHDfNljICYCw656w9oaiWe+hPdqay3vfbgp44r/N+9lDWY6w5f3P0rhwpWER46+ji8N8HR/K4kKQ6JvgKgNlDdp3qwVnE19gfdCoONJmnZuonnHBry6C4hwBNEV3ssaSYNJJZHRGLGZ88mftxS3tLSdL8lIopiyfDmr363z5S2BeC6heasO9jVJlIA2aGQEdFqTKN9D49bVJE9WIFw3w3u3q4oRoNNJ3AGDyX9yCbEZ81EFMSuJDOgMXw4NG14oNYzPyz4fzwrEq2nLe+9dtd/aznshEBKS1RU0bF1N4ujezP+Hs+Y643kIpW75b4SHj6Fw4YtEpz0KCkzqWr6cnKtZWgrDsuDLboHYGhg+vGrYVCeJawh9kffOn6Px3XW07H0PnWhBhnOy4j0TBJhUgtCw0eTNmkei4jCtR/+EUA7CDWXJl0lAEJ38MAVPryQyZgLGv15fzu2nmV8MA8KyZ0EMDBxt03tpgSs75blhCJpbaP5wC03vrcO/WoOM5HRN7123Uo1OJVGxQvLmLCL/icW4A/oRtKRp2f0Ojdt/j19zFtwwQqms+FKnEshIlNiM+RTMX4Y7aNA1fNkWFF8o1cwuEoS7kEN2CcSd5wN+eVERi4HUYAyIsNViiWP7qV//6056z83OUlIJUA7RshkUPv9dwsPvxXigPWvpMgxBfSON29bQvHMrQbzJbpbIQq7oAJ1K4vQroXDRnxF7ZD4yGm7nSxS0JuGRkOYnE2TPgLjxmOZXByVFQyGnxEbd5KlqGre9TqJ8D8b3b4Gz0uAHhEaOo/DpFUTvnw3Clr18Yy3eZIoU0rE5dvKzT2jYsork0b2YIECEI9nzpdZERk6kYMFyomUPggiRvAINZ2FSgeZfFvYQiJsrNL/YLQlJCBWBvLCDpo0/I4i3ZG0NJggw6SRu6RAKnlxG7swnUbEoOgl+JtuYka95vAiq4oa3LiuCjKvJsHW/1vI9NL79OslPjyIcNzsvMAadaEYIyHv2b3AmLCZRC14A04dp/nH+zdfW5R6LkNat0s3gV3yGaW1E5uRnx3vJBCqvkNjjz1MwbzlOcREmDV6rjZQjwpoXBhrGxBRKwOgYPJCvWVcDh+ISkwRXQu60meSMn0bzzq007ViHd+ms1aGqi8vSHgRpVPFInInLSBc8ilebWWs3NEu3G1VCgnBdUE52EVI6xKY/QcHTKy3vBRAkLKEXOYalAwzTCgURda0FDM6R/GQ4fBYPWHtJcCIpcROgnDAFC75J7rTZtoi7extBS+ONlYEx4CcQOf1RY59BjX8WkdvP7mAWjcXb0u0zvodJp4iMnkzBwpVEp8wAATrVIS2eLw6Y21+Qf4MKgRIwJqb46UjDgcaA1ZckcV/gBqAKi+n/4l8Se/gJGt5eQ3z/B1+em/tJEBJ135M4k1cii0fYyOxlv75eBdHoAJNM4AwYTP5jz5H3jUWovFg772lgakyzuASGRbsuWSJKMKtIMT6m2VZneLde4nvg+hAeMYqSH/4t8amzady+ltTJCkQobGnbTyMHTsYp+xZy2Mz2AHarj9OLCCLDEWKPLiR/3nLcklKM18F7Q0KGZaWaiXkKJ8uiSlFIsuIemN1P82YtHG2RkARHCWIzHyNaNp3mjzbT9N7vCTyFO2kZauxCCEVsGbyH6le9BqLxUkRnf4d+K1egFARJSGvIU4bFAwwz+gly1K0XIgQwNCr56+E2IdhQJ/g8KXCT4ESj5D+1HEpnEa+VyH4DLXhez66110AUArx0IVcOQ04xxAbYrtwTRdAv1DXTMwbONWhK8gThm1QHlICpBZKxMcO+hoA36yQNNYLWC+AnByPzgPRNdkPS3knsQ4ElwE9B/UmYGtIsnWQb8115LjVp1hyGHSclEwZovv+QYfQAedNUPEcJ5vRXxK8G/KJa4YiMjDU3QcE3mCufIwqGWS3Xl6KzyCzCCegSgI0JzQcnDa8clLSmBSEFR2skP90Mz47TPDcRBubf3JJzMtZ1wzwgo331lVP4B36L8VoJzf9XEPQtEDv3XW5os9pw8JzhP/cKzjZKwg6EM28XUvbz6ysk75yAHzykefQ+Qe4NKtPa3Nh1hQsm2YJfvhGvYh2m8Rxq+Oysqk59YirsXL3mlYOw64xEAjnul1NWxAFPw7/vlmz+xPC9BzTThsjurdu1Zangs114R17DXKkGFUKE87JuV9xxEI2B/zlgeP+UIq8LpUIprIV+ekXwbzvh5eWGiNuFxSvrvqamCu/wq+gLB0D74EYzpuv3TbHdZeNQ1mW79eIS8kI3cdtOrqubLxMcW4dfvRnSLeDkgNMzy+8TIPZKW10I26YNPPxjm/GPr8c0ngU30mF9fV0n3unHcQTB2QMER17B1B63lfZQbu9811cRwHg8zt5Nb5B+7/e4JgVuTu9u2N0PWQcZ+L7PwQOH+MXPf8m5M6cJhSMgcnrf6u9u/ASONIDgRPUJfvfKKj76aDdKSUKR6O2jjr6ARatnO4rdwk/ZqHup9jLvbvkDb7yxgXQ6TTgcvu3v7/QBY2LBGKisMzQlBSHnJtE6I1lkUx01RzbyV7/aSGu8BdcN3REA+4wlzhih+GWJZu0Rw1tVEq07Ur4vZhsiMASVW/HKV6Mbz2NUhHCW3b67DsSbZVT9opIfzIA592peOwwHz2fmezJFAiToi8fwjq0lOLsHEIhQLn3hOMvt6bF0ke+kgHGlkn940rDvbMCv90kuNAtM/Wn08XUE1VswXmtGsgjwkl/i7YaQ6rRphkwZKXyXgphZiZJw4Lzg4NmAyYMlzk1G2VwleGSEYtJAw/6TLcQ//4y6SA6pKUtAyuvrQ8YghCAaCXGlIc5HVfUkPJGZzpUYL46uq8jkx+IutEQXZACNCcHfb1c8PFSzYophTMnNa4L5EcHcCTGYMBeYe9PfvxoPePOYRBdDyAhbywyDrj1N6u2fQpDudsH1zoKoXPzKDYhQDDlyNtKRhDzYe1Zy4DwsGhvw/CRBad6tj/7G04btJ+B3hxSJtA1Kwsnw6IVKvMOvgpfoFQB7F0TpYhrOkP7jP6M+m4mavAJZOsEWWH3YUKHYdgK+90DA46MksSyOSvgaDp3T/Gqv4EKTwFUQdu2qTMNFguPr8Ku3WAt0IncjJxpQdkXBmV0EFw/jjH8WNX4xMr+YsA9+AP/xJ8XmKsOPZwSUDVKoLhrmqSua1w7B7tMSJTvAI5UkqNqOf3QNpvmirdo4vSuBbkN0Frb0pH388tUEp3fjTFqKGjUfGQoR8eFco+DvtinmjNCsmArDiuQNeE+zsQI2VEhSfofrGgP69J/wy99A15TbEbJeqtr0DIhtZ2e75d4KZC6m+QLerp8RnHgHZ/KLyOEzcBXgwwenJLvPwDPjNUsmQVFuB5iJtGF7tWZNuaQ+IQgriITBKNC11fhH1hCc2QVGZ1+1McFtBDGUjwl8hEyD6ub4rwqBMui6KtI7/gk5fDZu2QvIkjHtfLnumOTdTw0vTQt4ZITg1FXDf+2VnGqwLdBIyL65bqolqFiPX70VUi1WC2Y59ImfRITyrSwzvQDiNX8zAGfcMwgnjH/sdcs7TqSb48XCLtgY9KkdpM7vxxn9FGrSEkR+CWEfWtOCn+9RvHrI0JzuSAWFY8+rBMc34VduwDSds6X+bKzPaDvgFIrh3P8Savw3r1mw7mlLTAe2FyIM4OSgyp5DjphFULWRoPItTKrRLqY7HTMhwM0FncY/9gbB6Z04E5egRj+Fk5OL8qA5JZDS7pMJDMGp3XjlqzB1lXZkNxTLznX9BEgXNWo+zqSliOJRFrW22e1uMFaXJmVbUoaX98H2EwJjLJjWNe0/U3sC78Bv0ef322/ONhoGduhSlkzAmfbnyHsesA12Mg32Q68SnP7ACsBs07jAw2gfWXQv7v0vIUfMyoCa+bG20mnaPZqfzIR7Cnpo3LjtqajRvPyxoKJO4GSKA+32rA368/fxj65FX64G6WYkTjZWYodB1b1zUeMXos8eJKjcgEk2dN/aO7uul0DkDcSZuAw15ikIR9unw4yxA1cluYYfTtfMGN51udXtw0Ap33Dkgp1UON9kxzzaTpDaqYJW/KrNBBXrMS0X7aKzPI5BkLLu7iUy0d3JnvfcXNToBTiTliEL7Zhf+8n9wPLtj6ZrZo8Q5EW6t0lZH0uLpwzbqw2vH5U0JugopspMxtB4ieD4evxP34FUk3XxbCKn0dl9rrNFD30Yp+wFROmEa3gvHVhvWjBGs3yyoCSWXXHilg9I1rdqXj8Mmz6xC22fFs7wpb5UjV++Cn12jwXE6e0CqrBpnvaQA8bbkeLhs+zmZly3jfemD9F890G4t/+t5e89dlT35GXNy/vgwAWJqzKXY7TxpQF9Zg/+kdfQNcesHJG9kCwZDek4Iv8enLLlqFHzIRK1Q50Z3ksFMKTA8OOHDVPvkV3mvdsCIkDaN+w9Y/jNPkFtiy0ItPElLtDajF/5FkHVW5h4nc1re6KyYox1XScHdd9cnLLlyKIh7bzX5rqOhO9O08wf033eu20gtj3NScOmCsPaY5KkD+H2M7wZSdRwHr98DcGpD8CLZx9x23gPiRzyAM6UbyMHTrDRIiNZPG338LF7Nd+ZBiV5PX9/Qa9epFHbrHm9XPD2J7ZA6naSREJAcPE4fvlq9Lm9HVlMl1M1z54GKB6DmrwCNeIblkM68Z6nYeogw/cetEXg3urH3JYrXapqNasOwf5zEkd20pdts4In3yc4/iZBXaU9WC7dm+S5CUTeYJxxi1DjnkXk5FnXNXZKLB3A4HzD9x/UPDRMEurlm+5u2+VCvob9ZzW//vh6fYkLJFvxP9lEULEe3VyD+GI+njkFRSiGc988VNlyZEEpxu+k93yIhuDFqQELxsobTtLelSB2LuVvqzK8ckjiBZ3mEtv0Zf0l/MoNBCe22jlCNwp+ChCo4bNQE5chB12r99p4b+FYw5Iy0yMthz4NYttzvkGz5gi896mVGc4X9eW5w/iHX0Nf2Ifodx9O2bdQo+dbsDPnUNpct6zU8NKDhokD78ztdXf06j9toLJG85uPBVV1AqezvnSBtIc+/zGyeBzk979G76UDKIrCXzykmTVCELqDt1L2iUso04Fh9ynNfx+Q1LaIjua7yIj14Fq9F5KwcqpmwVhBQc6dn4HoU9ehNicNW6sMq49IC1anuOJlrk14YpRmxRQYXNB37hQWffGK6Jomy5fbT0hMJjBPLNX86GEYVSx7+mKnryaIbYqmqlaz6jA8OQpmjhC9rve+ciDeTY/8GoJbf/53AGdTWJr/iO3TAAAAAElFTkSuQmCC";



	anos = new Array<any>();
	spinner = false;
	msg_sem_dados = false;

	nome_filiado: any = null;
	matricula: any = null;
	cpf: any = null;
	total_UNIMED: any = null;
	total_UNIODONTO: any = null;

	gastos_mes_unimed = new Array<any>();
	gastos_mes_uniodonto = new Array<any>();
	data_impressao: any = null;

	ano_selecionado = null;
	ano_corrente = null;
	lista_gastos = null;

	constructor(private extratoService: ExtratoService) {
		let data = new Date();
		this.ano_corrente = data.getFullYear();
	}

	ngOnInit(): void {
		this.montaAnos();
	}

	montaAnos() {

		for (let i = 2018; i <= this.ano_corrente; i++) {

			let ano = {
				ano_id: i,
				ano: i
			}

			this.anos.push(ano);

		}
	}

	montaData() {
		let data_hoje = new Date();
		let dia = data_hoje.getDate();
		let mes = data_hoje.getMonth() + 1;
		let ano = data_hoje.getFullYear();
		this.data_impressao = dia + '/' + mes + '/' + ano;
		console.log(this.data_impressao);
	}

	imprimirDemonstrativo() {

	}

	buscaGastosSaude() {
		this.msg_sem_dados = false;
		this.lista_gastos = null;
		this.spinner = true;
		this.extratoService.buscaGastosSaude(this.ano_selecionado)
			.subscribe((data: any) => {

				console.log(data);

				this.spinner = false;
				if (data.gastos_unimed.length > 0 ) {
          //&& data.gastos_uniodonto.length > 0
					this.lista_gastos = data;

					this.nome_filiado = data.nome;
					this.cpf = data.cpf;
					this.matricula = data.matricula;
					this.total_UNIMED = data.total_unimed;
					this.total_UNIODONTO = data.total_uniodonto;

					console.log("Nome filiado:" + this.nome_filiado);
					console.log("cpf:" + this.cpf);
					console.log("matricula:" + this.matricula);
					console.log("ano:" + this.ano_selecionado);
					console.log("total UNIMED: " + this.total_UNIMED);
					console.log("total UNIODONTO: " + this.total_UNIODONTO);

					//							console.log(this.lista_gastos.gastos_unimed);
					this.gastos_mes_unimed = new Array<any>();
					//					var cabecalho = [];
					//					cabecalho.push('MÊS');
					//					cabecalho.push('DESCRIÇÃO');
					//					cabecalho.push('R$ VALOR');
					//					this.gastos_mes_unimed.push(cabecalho);

					for (let i = 0; i < this.lista_gastos.gastos_unimed.length; i++) {

						var dados = [];

						dados.push(this.lista_gastos.gastos_unimed[i].mes);
						dados.push(this.lista_gastos.gastos_unimed[i].convenio);
						dados.push({ text: this.lista_gastos.gastos_unimed[i].valor.toString(), alignment: 'right' });

						this.gastos_mes_unimed.push(dados);
					}

					this.montaData();
					console.log(this.gastos_mes_unimed);

					this.gastos_mes_uniodonto = new Array<any>();
					//					var cabecalho = [];
					//					cabecalho.push('MÊS');
					//					cabecalho.push('DESCRIÇÃO');
					//					cabecalho.push('R$ VALOR');
					//					this.gastos_mes_uniodonto.push(cabecalho);

					for (let i = 0; i < this.lista_gastos.gastos_uniodonto.length; i++) {

						var dados = [];

						dados.push(this.lista_gastos.gastos_uniodonto[i].mes);
						dados.push(this.lista_gastos.gastos_uniodonto[i].convenio);
						dados.push({ text: this.lista_gastos.gastos_uniodonto[i].valor.toString(), alignment: 'right' });

						this.gastos_mes_uniodonto.push(dados);
					}

					this.montaData();
					console.log(this.gastos_mes_uniodonto);

					this.imprimirDemonstrativoDeGastosSaude();

				}
        // else {

				// 	if (data.gastos_unimed.length > 0) {

				// 		this.lista_gastos = data;

				// 		this.nome_filiado = data.nome;
				// 		this.cpf = data.cpf;
				// 		this.matricula = data.matricula;

				// 		console.log("Nome filiado:" + this.nome_filiado);
				// 		console.log("cpf:" + this.cpf);
				// 		console.log("matricula:" + this.matricula);
				// 		console.log("ano:" + this.ano_selecionado);


				// 		//		console.log(this.lista_gastos.gastos_unimed);
				// 		this.gastos_mes_unimed = new Array<any>();
				// 		var cabecalho = [];

				// 		cabecalho.push('MÊS');
				// 		cabecalho.push('DESCRIÇÃO');
				// 		cabecalho.push('R$ VALOR');
				// 		this.gastos_mes_unimed.push(cabecalho);

				// 		for (let i = 0; i < this.lista_gastos.gastos_unimed.length; i++) {

				// 			var dados = [];

				// 			dados.push(this.lista_gastos.gastos_unimed[i].mes);
				// 			dados.push(this.lista_gastos.gastos_unimed[i].convenio);
				// 			dados.push(this.lista_gastos.gastos_unimed[i].valor);

				// 			dados.push({ text: this.lista_gastos.gastos_unimed[i].valor.toString(), alignment: 'right' });


				// 			this.gastos_mes_unimed.push(dados);
				// 		}

				// 		this.montaData();
				// 		console.log(this.gastos_mes_unimed);

				// 	}

				// 	if (data.gastos_uniodonto.length > 0) {
				// 		//	console.log(this.lista_gastos.gastos_uniodonto);

				// 		this.gastos_mes_uniodonto = new Array<any>();
				// 		var cabecalho = [];

				// 		cabecalho.push('MÊS');
				// 		cabecalho.push('DESCRIÇÃO');
				// 		cabecalho.push('R$ VALOR');
				// 		this.gastos_mes_uniodonto.push(cabecalho);

				// 		for (let i = 0; i < this.lista_gastos.gastos_uniodonto.length; i++) {

				// 			var dados = [];

				// 			dados.push(this.lista_gastos.gastos_uniodonto[i].mes);
				// 			dados.push(this.lista_gastos.gastos_uniodonto[i].convenio);
				// 			dados.push(this.lista_gastos.gastos_uniodonto[i].valor);

				// 			dados.push({ text: this.lista_gastos.gastos_uniodonto[i].valor.toString(), alignment: 'right' });


				// 			this.gastos_mes_uniodonto.push(dados);
				// 		}

				// 		this.montaData();
				// 		console.log(this.gastos_mes_uniodonto);

				// 	}

				// 	if (data.gastos_unimed.length == 0 && data.gastos_uniodonto.length == 0) {
				// 		this.msg_sem_dados = true;
				// 	}
				// }

			}, (erro) => {
				this.spinner = false;
				console.log(erro);
			});
	}



	imprimirDemonstrativoDeGastosSaude() {

		var matricula = this.matricula;
		var cpf = this.cpf;
		var nome = this.nome_filiado;
		var data = this.data_impressao;

		var documentDefinition = {

			info: {
				title: 'Demonstrativo de Gastos com Saúde',
				author: 'Portal do Filiado',
			},
			// a string or { width: number, height: number }
			pageSize: 'A4',

			// by default we use portrait, you can change it to landscape if you wish
			pageOrientation: 'portrait',

			footer: function (currentPage, pageCount) {
				return {
					table: {
						widths: [100, 350, "*"],
						body: [
							[
								{ text: 'Pagina ' + currentPage.toString() + ' de ' + pageCount, alignment: 'right', fontSize: 9 },
								{ text: '' },
								{ text: 'Impresso em: ' + data, alignment: 'left', fontSize: 9 }
							]

						],
					},
					layout: 'noBorders'
				};
			},


			watermark: { text: 'COMPANY', color: 'green', opacity: 0.1, bold: false, italics: false },

			content: [

				{
					style: 'tableExample',
					table: {
						widths: [50, '*'],
						body: [
							[{ rowSpan: 4, image: this.logo_base_64, width: 50 }, { text: '' }],
							['', { text: '' }],
							['', { text: '' }],
							['', { text: 'COMPANY', alignment: 'center', bold: true }],
						]
					}, layout: {

						hLineColor: function (i, node) {
							return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
						},
						vLineColor: function (i, node) {
							return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
						},
					}

				},


				{
					style: 'tableDadosCabecalho',
					table: {
						widths: [50, '*'],
						body: [
							[{ text: 'Nome........:' }, { text: nome }],
							[{ text: 'Matricula..:' }, { text: matricula }],
							['CPF...........:', cpf],
							['Referência:', 'Ano de ' + this.lista_gastos.ano]
						]
					}, layout: {

						hLineColor: function (i, node) {
							return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
						},
						vLineColor: function (i, node) {
							return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
						},
					}
				},


				{ text: '\n\n' },
				{ style: 'header', text: 'Demonstrativo de Gastos com Saúde' },
				{ text: '\n\n' },

				{
					columns:[
						{ style: 'header', text: 'UNIMED', alignment: 'left', fontSize: 12, },
			//			{ style: 'header', text: 'UNIODONTO', alignment: 'left', fontSize: 12, }
					]
				},

				{
					columns: [

						{

							//style: 'tableExample',
							table: {
								headerRows: 1,
								widths: [50, 80, 50],
								body: [
									[{ text: 'Mês', style: 'tableHeaderDados', alignment: 'center' }, { text: 'Descrição', style: 'tableHeaderDados', alignment: 'center' }, { text: 'Valor', style: 'tableHeaderDados', alignment: 'center' }]

								]
							}
						},

						// {

						// 	//style: 'tableExample',
						// 	table: {
						// 		headerRows: 1,
						// 		widths: [50, 80, 50],
						// 		body: [
						// 			[{ text: 'Mês', style: 'tableHeaderDados', alignment: 'center' }, { text: 'Descrição', style: 'tableHeaderDados', alignment: 'center' }, { text: 'Valor', style: 'tableHeaderDados', alignment: 'center' }]

						// 		]
						// 	}
						// }

					]
				},
				{
					columns: [
						{
							style: 'tableDados',
							table: {
								//	headerRows:[1,  alignment: 'center'],
								widths: [50, 80, 50],
								body: this.gastos_mes_unimed
							}
						},
						// {
						// 	style: 'tableDados',
						// 	table: {
						// 		//	headerRows:[1,  alignment: 'center'],
						// 		widths: [50, 80, 50],
						// 		body: this.gastos_mes_uniodonto
						// 	}
						// },
					]

				},

				{
					columns: [
						{
							table: {
								headerRows: 1,
								widths: [140, 50],
								body: [
									[{ text: 'Total UNIMED: ', style: 'tableHeaderDados', alignment: 'right' }, { text: this.total_UNIMED, style: 'tableHeaderDados', alignment: 'right' }]

								]
							}
						},
						// {
						// 	table: {
						// 		headerRows: 1,
						// 		widths: [140, 50],
						// 		body: [
						// 			[{ text: 'Total UNIODONTO: ', style: 'tableHeaderDados', alignment: 'right' }, { text: this.total_UNIODONTO, style: 'tableHeaderDados', alignment: 'right' }]

						// 		]
						// 	}
						// },

					]
				},

			],
			styles: {
				header: {
					fontSize: 18,
					bold: true,
					alignment: 'center',
					margin: [0, 0, 0, 10]
				},
				subheader: {
					fontSize: 16,
					bold: true,
					margin: [0, 10, 0, 5]
				},
				tableExample: {
					margin: [0, 5, 0, 5]

				},
				tableDados: {
					fontSize: 9,
					margin: [0, 5, 0, 5]
				},
				tableDadosCabecalho: {
					fontSize: 9,
					bold: true,
					margin: [0, 5, 0, 5]
				},
				tableHeaderDados: {
					bold: true,
					fontSize: 10,
					color: 'black'
				},
				tableHeader: {
					bold: true,
					fontSize: 13,
					color: 'black'
				}
			}

		}


		pdfMake.createPdf(documentDefinition).open();
	}



}

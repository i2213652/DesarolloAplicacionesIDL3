<template>
	<div>
		<HeaderNav />

		<Card
			style="
				width: 60%;
				margin-left: 20%;
				margin-top: 1%;
				background-color: #e3e6e1;
			"
		>
			<template #header>
				<img
					src="@/assets/images/datos_personales/user.jpg"
					style="width: 30%; margin-left: 35%"
				/>
			</template>
			<template #title>Mi información básica </template>
			<template #content>
				<TabView>
					<TabPanel header="Datos personales">
						<div class="row">
							<div class="form-group col-md-2 col-5">
								<label class="label-title">DNI</label>

								<input
									type="number"
									class="form-control center"
									min="0"
									step="1"
									lang="en"
									maxlength="8"
									oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
									v-model="frmDatosCliente.dni"
									:disabled="true"
								/>
							</div>
							<div class="form-group col-md-3 col-7">
								<label class="label-title">Apellido paterno</label>

								<textarea
									type="text"
									rows="1"
									class="form-control mayus"
									v-model="frmDatosCliente.apellido_paterno"
									:disabled="true"
								></textarea>
							</div>
							<div class="form-group col-md-3 col-5">
								<label class="label-title">Apellido materno</label>

								<textarea
									type="text"
									rows="1"
									class="form-control mayus"
									v-model="frmDatosCliente.apellido_materno"
									:disabled="true"
								></textarea>
							</div>
							<div class="form-group col-md-4 col-7">
								<label class="label-title">Nombres</label>

								<textarea
									type="text"
									rows="1"
									class="form-control mayus"
									v-model="frmDatosCliente.nombres"
									:disabled="true"
								></textarea>
							</div>

							<div class="form-group col-md-4 col-6">
								<label class="label-title">Fecha de nacimiento</label>

								<input
									type="date"
									class="form-control center"
									v-model="frmDatosCliente.fecha_nacimiento"
									:disabled="frmDatosCliente.modo == 'NO-EDITAR'"
									:class="[
										submited
											? !v$.frmDatosCliente.fecha_nacimiento.$invalid
												? 'is-valid'
												: 'is-invalid'
											: '',
									]"
								/>
							</div>
							<div class="form-group col-md-3 col-6">
								<label class="label-title">Estado civil</label>

								<select
									class="form-select center"
									v-model="frmDatosCliente.estado_civil"
									:disabled="frmDatosCliente.modo == 'NO-EDITAR'"
								>
									<option value="0" disabled>Seleccione...</option>
									<option value="Soltero">Soltero</option>
									<option value="Casado">Casado</option>
									<option value="Conviviente">Conviviente</option>
									<option value="Divorciado">Divorciado</option>
									<option value="Viudo">Viudo</option>
								</select>
							</div>
							<div class="form-group col-md-3 col-6">
								<label class="label-title">Género</label>

								<select
									class="form-select center"
									v-model="frmDatosCliente.sexo"
									:disabled="frmDatosCliente.modo == 'NO-EDITAR'"
								>
									<option value="0" disabled>Seleccione...</option>
									<option value="F">Femenino</option>
									<option value="M">Masculino</option>
								</select>
							</div>

							<div class="form-group col-md-2 col-6">
								<label class="label-title">Hijos</label>
								<input
									type="number"
									min="0"
									step="1"
									class="form-control center"
									v-model.number="frmDatosCliente.hijos"
									onkeypress="return event.charCode >= 48 && event.charCode <= 57"
									:disabled="frmDatosCliente.modo == 'NO-EDITAR'"
								/>
							</div>

							<div class="form-group col-md-4 col-5">
								<label class="label-title">Agencia</label>
								<input
									type="text"
									class="form-control center"
									:value="frmDatosCliente.agencia"
									:disabled="true"
								/>
							</div>
							<div class="form-group col-md-8 col-7">
								<label class="label-title">Correo electrónico</label>
								<form autocomplete="off">
									<input
										type="text"
										class="form-control"
										v-model="frmDatosCliente.correo_electronico"
										:disabled="
											frmDatosCliente.modo == 'NO-EDITAR' ||
											frmDatosCliente.modo == 'PARIENTE_AVAL'
										"
									/>
								</form>
							</div>
						</div>
					</TabPanel>
					<TabPanel header="Datos de contacto">
						<div class="row">
							<div class="form-group col-md-12">
								<label class="label-title">Dirección</label>

								<form autocomplete="off">
									<textarea
										class="form-control mayus"
										:class="[
											submited
												? !v$.frmDatosCliente.direccion.$invalid
													? 'is-valid'
													: 'is-invalid'
												: '',
										]"
										rows="1"
										v-model="frmDatosCliente.direccion"
										:disabled="
											frmDatosCliente.modo == 'NO-EDITAR' ||
											frmDatosCliente.modo == 'PARIENTE_AVAL'
										"
									></textarea>
								</form>
							</div>
							<div class="form-group col-md-4 col-4">
								<label class="label-title">Departamento</label>

								<select
									class="form-select center"
									@change="FiltrarProvincias"
									v-model="frmDatosCliente.departamento_id"
									:disabled="frmDatosCliente.modo == 'NO-EDITAR'"
								>
									<option value="0" disabled>Seleccione...</option>
									<option
										v-for="(item, index) in departamentos"
										:key="index"
										:value="item.id"
									>
										{{ item.departamento }}
									</option>
								</select>
							</div>
							<div class="form-group col-md-4 col-4">
								<label class="label-title">Provincia</label>

								<select
									class="form-select center"
									@change="FiltrarDistritos"
									v-model="frmDatosCliente.provincia_id"
									:disabled="frmDatosCliente.modo == 'NO-EDITAR'"
								>
									<option value="0" disabled>Seleccione...</option>
									<option
										v-for="(item, index) in provincias_filtradas"
										:key="index"
										:value="item.id"
									>
										{{ item.provincia }}
									</option>
								</select>
							</div>
							<div class="form-group col-md-4 col-4">
								<label class="label-title">Distrito</label>

								<select
									class="form-select center"
									v-model="frmDatosCliente.distrito_id"
									:disabled="frmDatosCliente.modo == 'NO-EDITAR'"
								>
									<option value="0" disabled>Seleccione...</option>
									<option
										v-for="(item, index) in distritos_filtrados"
										:key="index"
										:value="item.id"
									>
										{{ item.distrito }}
									</option>
								</select>
							</div>

							<div class="form-group col-md-12 col-12">
								<label class="label-title">Referencia</label>

								<textarea
									class="form-control text-row mayus"
									:class="[
										submited
											? !v$.frmDatosCliente.referencia_direccion.$invalid
												? 'is-valid'
												: 'is-invalid'
											: '',
									]"
									rows="3"
									v-model="frmDatosCliente.referencia_direccion"
									:disabled="frmDatosCliente.modo == 'NO-EDITAR'"
								/>
							</div>

							<div class="form-group col-md-4 col-4">
								<label class="label-title">Número</label>

								<div class="p-inputgroup">
									<span class="p-inputgroup-addon"> 1 </span>
									<InputText
										type="number"
										min="0"
										lang="en"
										maxlength="9"
										oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
										v-model="frmDatosCliente.telefonos.t1"
										:disabled="frmDatosCliente.modo == 'NO-EDITAR'"
										:class="[
											submited
												? !v$.frmDatosCliente.telefonos.t1.$invalid
													? 'is-valid'
													: 'is-invalid'
												: '',
										]"
									/>
								</div>
							</div>

							<div class="form-group col-md-4 col-4">
								<label class="label-title">Operador</label>

								<div class="p-inputgroup">
									<span class="p-inputgroup-addon"> 1 </span>

									<Dropdown
										v-model="frmDatosCliente.telefonos.o1"
										:options="operadores"
										optionLabel="name"
										optionValue="code"
										:class="[
											submited
												? !v$.frmDatosCliente.telefonos.o1.$invalid
													? 'is-valid'
													: 'is-invalid'
												: '',
										]"
										:disabled="frmDatosCliente.modo == 'NO-EDITAR'"
									/>
								</div>
							</div>

							<div class="form-group col-md-4 col-4">
								<label class="label-title">Notas</label>
								<div class="p-inputgroup">
									<span class="p-inputgroup-addon"> 1 </span>
									<InputText
										type="text"
										rows="1"
										class="mayus"
										:class="[
											submited
												? !v$.frmDatosCliente.telefonos.n1.$invalid
													? 'is-valid'
													: 'is-invalid'
												: '',
										]"
										v-model="frmDatosCliente.telefonos.n1"
										:disabled="frmDatosCliente.modo == 'NO-EDITAR'"
									/>
								</div>
							</div>
						</div>
					</TabPanel>
				</TabView>
			</template>
			<template #footer>
				<Button
					icon="pi pi-check"
					label="Editar"
					@click="frmDatosCliente.modo = 'EDITAR'"
					v-if="frmDatosCliente.modo == 'NO-EDITAR'"
				/>
				<Button
					icon="pi pi-save"
					label="Guardar"
					@click="Guardar"
					v-if="frmDatosCliente.modo == 'EDITAR'"
				/>
				<Button
					icon="pi pi-times"
					label="Cancel"
					class="p-button-secondary"
					style="margin-left: 0.5em"
					@click="
						frmDatosCliente.modo = 'NO-EDITAR';
						submited = false;
					"
					v-if="frmDatosCliente.modo == 'EDITAR'"
				/>
			</template>
		</Card>
	</div>
</template>

<script>
import { useStorage } from "vue3-storage";
import HeaderNav from "@/components/HeaderNav.vue";
import Card from "primevue/card";
import Button from "primevue/button";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";

import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const api_url = import.meta.env.VITE_API_URL;
const noZero = (value) => value != 0;
export default {
	setup() {
		return { v$: useVuelidate(), storage: useStorage() };
	},
	components: {
		HeaderNav,
		Card,
		Button,
		TabView,
		TabPanel,
		InputText,
		Dropdown,
	},
	data() {
		return {
			submited: false,
			cliente: this.storage.getStorageSync("cliente"),
			departamentos: [],
			provincias: [],
			provincias_filtradas: [],
			distritos: [],
			distritos_filtrados: [],
			operadores: [
				{ name: "Seleccione...", code: 0 },
				{ name: "Movistar", code: "Movistar" },
				{ name: "Claro", code: "Claro" },
				{ name: "Bitel", code: "Bitel" },
				{ name: "Entel", code: "Entel" },
			],
			frmDatosCliente: {
				telefonos: {
					t1: null,
					o1: null,
					n1: null,
				},
			},
		};
	},
	validations: {
		frmDatosCliente: {
			fecha_nacimiento: { required },
			direccion: { required },
			referencia_direccion: { required },
			telefonos: {
				t1: { required },
				o1: { noZero },
				n1: { required },
			},
		},
	},
	mounted() {
		this.ListarDatos();
	},
	methods: {
		async ListarDatos() {
			let self = this;
			await axios
				.get(
					api_url +
						"/cliente/datos_personales/" +
						this.cliente.agencia_id +
						"/" +
						this.cliente.id
				)
				.then(function (response) {
					let datos_personales = response.data.datos_personales;
					self.frmDatosCliente = datos_personales;

					let telefonos = [];

					if (typeof datos_personales.telefonos === "string") {
						telefonos = JSON.parse(datos_personales.telefonos);
					} else {
						telefonos = datos_personales.telefonos;
					}
					self.frmDatosCliente.telefonos = telefonos;

					self.departamentos = response.data.departamentos;
					self.provincias = response.data.provincias;
					self.provincias_filtradas = response.data.provincias;
					self.distritos = response.data.distritos;
					self.distritos_filtrados = response.data.distritos;

					self.frmDatosCliente.modo = "NO-EDITAR";
				});
		},
		FiltrarProvincias(e) {
			let departamento_id = e.target.value;

			if (!departamento_id == 0) {
				this.provincias_filtradas = this.provincias.filter(
					(item) => item.departamento_id == departamento_id
				);
			} else {
				this.provincias_filtradas = this.provincias;
			}

			this.frmDatosCliente.provincia_id = 0;
			this.frmDatosCliente.distrito_id = 0;
		},
		FiltrarDistritos(e) {
			let provincia_id = e.target.value;

			if (!provincia_id == 0) {
				this.distritos_filtrados = this.distritos.filter(
					(item) => item.provincia_id == provincia_id
				);
			} else {
				this.distritos_filtrados = this.distritos;
			}

			this.frmDatosCliente.distrito_id = 0;
		},

		async Guardar() {
			let self = this;
			this.submited = true;

			if (this.v$.frmDatosCliente.$invalid) {
				this.$swal.fire({
					icon: "error",
					title: "¡Ups!",
					text: "Hay uno o más campos vacíos, verifique.",
				});
				return false;
			}

			this.$swal
				.fire({
					title: "¿Desea continuar?",
					confirmButtonText: "Si",
					showCancelButton: true,
					cancelButtonText: "No",
					allowOutsideClick: false,
					backdrop: true,
				})
				.then((result) => {
					if (result.isConfirmed) {
						let data = new FormData();
						data.append("cliente_id", this.cliente.id);
						data.append(
							"frmDatosCliente",
							JSON.stringify(this.frmDatosCliente)
						);

						self.$swal.fire({
							title: "Registrando...",
							showConfirmButton: false,
							allowOutsideClick: false,
							willOpen: async () => {
								self.$swal.showLoading();

								return await axios
									.post(api_url + "/cliente/datos_personales", data)
									.then((response) => {
										self.submited = false;
										self.ListarDatos();

										return self.$swal.fire({
											icon: "success",
											title: "¡ÉXITO!",
											timer: 1200,
											showConfirmButton: false,
										});
									})
									.catch((error) => {
										self.$swal.showValidationMessage(
											`Ha ocurrido un error, comunicar a TI: ${error}`
										);
									});
							},
						});
					}
				});
		},
	},
};
</script>

<style>
</style>
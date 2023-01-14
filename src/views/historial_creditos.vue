<template>
	<div>
		<HeaderNav />
		<Card
			style="
				width: 80%;
				margin-left: 10%;
				margin-top: 1%;
				background-color: #e3e6e1;
			"
		>
			<template #title>Mis créditos </template>
			<template #content>
				<div class="row col-md-12">
					<div class="form-group col-md-6 mb-1">
						<div class="p-inputgroup">
							<span class="p-inputgroup-addon"> TITULAR</span>
							<InputText
								type="text"
								class="form-control input-information"
								:value="nombre_completo_titular"
								readonly
							/>
						</div>
					</div>

					<div class="form-group col-md-3 col-6">
						<div class="p-inputgroup">
							<span class="p-inputgroup-addon"> DNI</span>
							<InputText
								type="text"
								class="form-control center input-information"
								:value="datos_cliente.dni"
								readonly
							/>
						</div>
					</div>

					<div class="form-group col-md-3 col-6">
						<div class="p-inputgroup">
							<span class="p-inputgroup-addon">EXP.</span>
							<InputText
								type="text"
								class="form-control center input-information"
								:value="datos_cliente.codigo_expediente"
								readonly
							/>
						</div>
					</div>

					<div class="form-group col-md-3 col-4">
						<div class="p-inputgroup">
							<span class="p-inputgroup-addon">CALIF.</span>
							<InputText
								type="text"
								class="form-control center input-information"
								:value="datos_cliente.calificacion"
								readonly
							/>
						</div>
					</div>

					<div class="form-group col-md-3 col-8">
						<div class="p-inputgroup">
							<span class="p-inputgroup-addon">ASESOR</span>
							<InputText
								type="text"
								class="form-control center input-information"
								:value="datos_cliente.usuario_asesor"
								readonly
							/>
						</div>
					</div>
				</div>

				<hr />
				<DataTable
					showGridlines
					:value="datos_creditos"
					:scrollable="true"
					scrollHeight="400px"
					scrollDirection="both"
					:paginator="true"
					:rows="datos_creditos.length"
					paginatorTemplate="CurrentPageReport"
					currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registro(s)"
					v-model:selection="credito_seleccionado"
					selectionMode="single"
					@rowSelect="ListarCuotas"
				>
					<Column
						class="align-center"
						field="numero"
						header="#"
						style="width: 30px"
					>
						<template #body="{ index }">
							{{ index + 1 }}
						</template>
					</Column>
					<Column
						class="align-right"
						field="monto"
						header="MONTO"
						style="width: 100px"
					>
						<template #body="{ data }">
							S/ {{ roundTo(data.monto, 2) }}
						</template>
					</Column>
					<Column
						class="align-center"
						field="plazo"
						header="PLAZO"
						style="width: 120px"
					>
						<template #body="{ data }">
							{{
								roundTo(data.plazo, 0) +
								" " +
								periodo_medicion(data.periodo_pago)
							}}
						</template>
					</Column>
					<Column
						class="align-right"
						field="cuota"
						header="CUOTA"
						style="width: 120px"
					>
						<template #body="{ data }">
							S/ {{ roundTo(data.cuota, 2) }}
						</template>
					</Column>
					<Column
						class="align-center"
						field="fecha_desembolso"
						header="FECHA_DESEMBOLSO"
						style="width: 150px"
					>
						<template #body="{ data }">
							{{ JSON.parse(data.datos_creacion).fecha }}
						</template>
					</Column>
					<Column
						class="align-center"
						field="tipo"
						header="TIPO"
						style="width: 150px"
					>
						<template #body="{ data }">
							{{ data.tipo }}
						</template>
					</Column>
					<Column
						class="align-center"
						field="estado"
						header="ESTADO"
						style="width: 150px"
					>
						<template #body="{ data }">
							{{ data.estado }}
						</template>
					</Column>
					<Column
						class="align-center"
						field="tasa_interes"
						header="TASA"
						style="width: 60px"
					>
						<template #body="{ data }">
							{{ roundTo(data.tasa_interes, 2) + "%" }}
						</template>
					</Column>
					<Column
						class="align-center"
						field="asesor"
						header="ASESOR"
						style="width: 120px"
					>
						<template #body="{ data }">
							{{ data.usuario_asesor }}
						</template>
					</Column>
					<Column
						class="align-right"
						field="mora_total"
						header="MORA_TOTAL"
						style="width: 120px"
					>
						<template #body="{ data }">
							S/ {{ roundTo(data.mora_total, 2) }}
						</template>
					</Column>
					<Column
						class="align-right"
						field="mora_pagada"
						header="MORA_PAGADA"
						style="width: 150px"
					>
						<template #body="{ data }">
							S/ {{ roundTo(data.mora_pagado, 2) }}
						</template>
					</Column>
					<Column
						class="align-right"
						field="notificacion_total"
						header="NOTIF_TOTAL"
						style="width: 150px"
					>
						<template #body="{ data }">
							S/ {{ roundTo(data.notificaciones_total, 2) }}
						</template>
					</Column>
					<Column
						class="align-right"
						field="notificacion_pagada"
						header="NOTIF_PAGADA"
						style="width: 150px"
					>
						<template #body="{ data }">
							S/ {{ roundTo(data.notificaciones_pagado, 2) }}
						</template>
					</Column>
					<Column
						class="align-right"
						field="mora_notificacion"
						header="MORA_NOTIF"
						style="width: 150px"
					>
						<template #body="{ data }">
							S/
							{{
								roundTo(
									parseFloat(data.mora_total) +
										parseFloat(data.notificaciones_total) -
										(parseFloat(data.mora_pagado) +
											parseFloat(data.notificaciones_pagado)),
									2
								)
							}}
						</template>
					</Column>
				</DataTable>

				<hr />

				<TabView>
					<TabPanel header="DETALLE DE PAGO">
						<DataTable
							showGridlines
							:value="cuotas_pagos"
							:scrollable="true"
							scrollHeight="400px"
							scrollDirection="both"
							:paginator="true"
							:rows="cuotas_pagos.length"
							paginatorTemplate="CurrentPageReport"
							currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registro(s)"
						>
							<Column
								class="align-center"
								field="numero"
								header="#"
								style="width: 30px"
							>
								<template #body="{ data }">
									{{ data.numero_cuota }}
								</template>
							</Column>
							<Column
								class="align-center"
								field="fecha_vencimiento"
								header="FECHA_VENCIMIENTO"
								style="width: 120px"
							>
								<template #body="{ data }">
									{{ data.fecha_vencimiento }}
								</template>
							</Column>
							<Column
								class="align-center"
								field="fecha_ultimo_pago"
								header="FECHA_PAGO"
								style="width: 120px"
							>
								<template #body="{ data }">
									{{ data.fecha_ultimo_pago }}
								</template>
							</Column>
							<Column
								class="align-center"
								field="estado"
								header="ESTADO"
								style="width: 80px"
							>
								<template #body="{ data }">
									{{
										data.estado == "P"
											? "PEN"
											: data.estado == "C"
											? "CAN"
											: "VEN"
									}}
								</template>
							</Column>
							<Column
								class="align-center"
								field="capital"
								header="CAPITAL"
								style="width: 100px"
							>
								<template #body="{ data }">
									S/ {{ roundTo(data.capital, 2) }}
								</template>
							</Column>
							<Column
								class="align-center"
								field="interes"
								header="INTERES"
								style="width: 100px"
							>
								<template #body="{ data }">
									S/ {{ roundTo(data.interes + data.redondeo, 2) }}
								</template>
							</Column>
							<Column
								class="align-center"
								field="cuota"
								header="CUOTA"
								style="width: 100px"
							>
								<template #body="{ data }">
									S/ {{ roundTo(data.cuota, 2) }}
								</template>
							</Column>
							<Column
								class="align-center"
								field="acumulado"
								header="ACUMULADO"
								style="width: 100px"
							>
								<template #body="{ data }">
									{{
										data.acumulado > 0 ? "S/ " + roundTo(data.acumulado, 2) : ""
									}}
								</template>
							</Column>
							<Column
								class="align-center"
								field="atraso"
								header="ATRASO"
								style="width: 30px"
							>
								<template #body="{ data }">
									{{ data.dias_atraso }}
								</template>
							</Column>
						</DataTable>
					</TabPanel>
				</TabView>
			</template>
		</Card>
	</div>
</template>

<script>
import HeaderNav from "@/components/HeaderNav.vue";
import Card from "primevue/card";
import { useStorage } from "vue3-storage";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Row from "primevue/row";
import InputText from "primevue/inputtext";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";

const api_url = import.meta.env.VITE_API_URL;

export default {
	setup() {
		return { storage: useStorage() };
	},
	components: {
		HeaderNav,
		Card,
		DataTable,
		Column,
		Row,
		InputText,
		TabView,
		TabPanel,
	},
	data() {
		return {
			cliente: this.storage.getStorageSync("cliente"),
			datos_cliente: {},
			datos_creditos: [],

			cuotas_pagos: [],

			credito_seleccionado: {},
		};
	},

	computed: {
		nombre_completo_titular() {
			return (
				this.cliente.nombres +
				" " +
				this.cliente.apellido_paterno +
				" " +
				this.cliente.apellido_materno
			);
		},
	},
	mounted() {
		this.ActualizarInformacion();
	},
	methods: {
		roundTo(value, decimal_places) {
			let valor = 0;
			let numero_decimales = decimal_places;

			if (value) {
				valor = value;
			}
			return parseFloat(valor).toFixed(numero_decimales);
		},
		periodo_medicion(value) {
			if (value == "DIARIO") {
				return "(DÍAS)";
			} else if (value == "SEMANAL") {
				return "(SEMANAS)";
			} else if (value == "QUINCENAL") {
				return "(QUINCENAS)";
			} else if (value == "MENSUAL") {
				return "(MESES)";
			}
			return "(DÍAS)";
		},
		async ActualizarInformacion() {
			let self = this;

			await axios
				.get(
					api_url +
						"/cliente/historial_creditos/" +
						this.cliente.agencia_id +
						"/" +
						this.cliente.id
				)
				.then(function (response) {
					self.datos_cliente = response.data.datos_cliente;
					self.datos_creditos = response.data.datos_creditos;
				});
		},
		async ListarCuotas() {
			let self = this;

			axios
				.get(
					api_url +
						"/cliente/historial_creditos/detalle/" +
						this.cliente.agencia_id +
						"/" +
						this.credito_seleccionado.id
				)
				.then(function (response) {
					self.cuotas_pagos = response.data.cuotas_pagos;
				});
		},
	},
};
</script>

<style>
</style>
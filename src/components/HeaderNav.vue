<template>
	<TabMenu :model="items" />
</template>

<script>
import TabMenu from "primevue/tabmenu";
export default {
	components: {
		TabMenu,
	},
	data() {
		return {
			items: [
				{
					label: "Home",
					icon: "pi pi-fw pi-home",
					to: "/home",
				},
				{
					label: "Mis datos personales",
					icon: "pi pi-fw pi-user",
					to: "/datos_personales",
				},
				{
					label: "Historial de créditos",
					icon: "pi pi-fw pi-history",
					to: "/historial_creditos",
				},
				{
					label: "Salir",
					icon: "pi pi-fw pi-sign-out",
					to: "/",
				},
			],
		};
	},
};
</script>

<style>
</style>
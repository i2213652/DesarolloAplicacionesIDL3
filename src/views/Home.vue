<template>
	<div id="home-container">
		<HeaderNav />
	</div>
</template>

<script>
import { useStorage } from "vue3-storage";
import HeaderNav from "@/components/HeaderNav.vue";
export default {
	setup() {
		return { storage: useStorage() };
	},
	components: {
		HeaderNav,
	},
	data() {
		return {
			cliente: this.storage.getStorageSync("cliente"),
		};
	},
	computed: {
		nombre_cliente() {
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
		this.$swal({
			icon: "success",
			title: "BIENVENIDO",
			text: this.nombre_cliente,
			timer: 1200,
			showConfirmButton: false,
		});
	},
};
</script>

<style lang="scss">
#home-container {
	position: fixed;
	padding: 0;
	margin: 0;

	top: 0;
	left: 0;

	width: 100%;
	height: 100%;
	box-sizing: border-box;

	background: url("@/assets/images/home/background.jpg");
	background-position: center center;
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-size: cover;
}
</style>
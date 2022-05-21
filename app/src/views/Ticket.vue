<template>
    <!-- The cart section only appears when the person clicks the jar-icon (cart-icon) -->
    <section class="cart">
        <!-- v-if="!toggleTicketSection" -->
        <div class="cart__background"></div>

        <div class="cart__layout">
            <header class="cart__layout-header">
                <!-- <button @click="emitCloseTicketSection()">
                    <img src="/svg/close-button.svg" alt="close-icon">
                </button> -->
            </header>
            <!-- <router-link class="ticketCard__title" :to="{ name: 'ticket', params: { ticketSlug: bug.slug.current }}">{{ bug.title }}
            </router-link> -->
            <!-- <h1>{{ $route.params.id }}</h1> -->
            <!-- <TicketEdit/> -->
           
        </div>
    </section>
</template>

<script>
    // import TicketEdit from '../components/TicketEdit.vue'
    export default {
        props: {
            toggleTicketSection: { type: Boolean },
            bug: { type: Object },
            // filteredBug: { Object },
        },

        components: {
            // TicketEdit,
        },

        methods: {
            emitCloseTicketSection() {
				this.$emit('close-ticket-section');
			}
        }
    }
</script>

<style>

    /* Cart Section */
    .cart {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        object-fit: cover;
        width: 100vw;
        height: 100vh;
        z-index: 400;
    }

    .cart__background {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.8;
        background-color: rgba(17, 17, 17, 0.7);
    }

    .cart__layout {
        transform: translateX(0);
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        /* align-items: center; */
        max-width: 500px;
        height: 100%;
        width: 100%;
        background-color: #fff;
    }

    .cart__layout-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 96px;
        padding: 24px 26px;
        width: 100%;
    }

    .cart__layout-header h1 {
        background-color: #111;
        color: #fff;
        padding: 12px 24px;
        font-size: 1.25rem;
        text-align: center;
    }

    .cart__layout-products {
        display: flex;
        flex-direction: column;
        flex: auto;
        justify-content: center;
        align-items: center;
        z-index: 500;
        /* overflow-y: scroll; */
        width: 100%;
        height: 100%;
        padding: 10px 22px 0px 22px;
    }

    .cartProducts__empty {
        text-align: center;
    }

    .cartProducts__empty a {
        text-decoration: none;
        color: inherit;
    }
    .cartProducts__addedProducts {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .cartProducts__addedProducts-products {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .cartProducts__addedProducts-products div {
        display: flex;
        align-items: center;
    }

    .cartProducts__addedProducts-products div img {
        width: 50px;
    }

    .cartProducts__addedProducts-products button img {
        width: 20px;
    }

    .cartProducts__addedProducts-price {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .cartProducts__addedProducts-price div {
        display: flex;
        align-items: center;
    }

    .cartProducts__addedProducts-price div p {
        width: 40px;
        text-align: center;
        border: var(--black) solid 2px;
    }

    .cartProducts__addedProducts-price div div {
        display: flex;
        flex-direction: column;
        margin: 5px;
    }

    .cart__layout-footer {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: var(--padding-small);
        background-color: var(--highlight);
        color: var(--white);
    }

    .cart__layout-footer > div {
        font-size: 1.5rem;
        padding-bottom: var(--padding-medium);
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
</style>
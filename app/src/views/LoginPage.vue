<template>
    <section class="login">
        <form class="form">
            <img class="form__logo" src="/svg/bugsTracker-logo.svg" alt="Logo for the friday.com">
            <h1 class="form__heading">Please Log in</h1>

            <div aria-label="username" class="form__email">
                <!-- <label for="floatingInput">Email address</label> -->
                <input autocomplete="off" type="email" aria-required="true" class="form-control" id="floatingInput" placeholder="Username(optional)">  
            </div>

            <div aria-label="password" class="form__password">
                <input type="password"  aria-required="true" class="form-control" id="floatingPassword" placeholder="Password(optional)">
            </div>

            <RouterLink class="form__logIn" :to="{ name:'bugsBoard' }">
                <button aria-label="login" class="form__logIn" type="submit">
                    Log in 
                </button>
            </RouterLink>
        </form>

        <footer>
            <p class="form__copyRights">&copy; <span class="form__copyRights-animate"></span></p>
        </footer>    
    </section>
</template>

<style>
    .login {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: #292F4C;
        color: white;
    }

    .login footer {
        position: fixed;
        bottom: 0;
        padding-bottom: var(--bottom-small);
    }

    .login form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .login form > * {
        padding-bottom: var(--bottom-small);
    }

    .form__logo {
        width: 92px;
        height: 77px;
    }
     
    .form__email,
    .form__password {
        display: flex;
        flex-direction: column;
    }

    .form__email input,
    .form__password input {
        padding: var(--padding-xsmall);
    }

    .form__logIn {
        display: flex;
        justify-content: center;
        align-items: center;
        color: inherit;
        text-decoration: none;
        color: inherit;
    }

    .form__logIn:hover {
        text-decoration: underline;
    }

    .form__copyRights-animate::before {
        content: '♥ by Judith Peter';
        animation: animate infinite 3s;
        padding-left: var(--left-xsmall);
    }
  
    @keyframes animate {
  
        0% {
            content: "♥ by Judith Peter";
        }
  
        50% {
            content: "Bugs Tracker";
        }
  
        75% {
            content: "♥ by Judith Peter";
        }
    }
</style>

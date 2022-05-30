<template>
    <section class="login">
        <form class="form">
            <img class="form__logo" src="/svg/bugsTracker-logo.svg" alt="Logo for the friday.com">
            <h1 class="form__heading">Please Log in</h1>

            <div aria-label="email" class="form__email">
                <!-- <label for="floatingInput">Email address</label> -->
                <input type="email" class="form-control" id="floatingInput" placeholder=" Username">
                
            </div>

            <div aria-label="password" class="form__password">
                <!-- <label for="floatingPassword">Password</label> -->
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
            </div>

            <RouterLink class="form__logIn" :to="{ name:'bugsBoard' }">
                <button aria-label="login button" class="form__logIn" type="submit">
                    Log in 
                </button>
            </RouterLink>

            <p class="form__copyRights">&copy; <span class="form__copyRights-animate"></span></p>
        </form>
    </section>
</template>

<style>
    .login {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: #292F4C;
        color: white;
    }

    .login form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .login form > * {
        padding-bottom: 20px;
    }

    .form__logo {
        width: 82px;
        height: 67px;
    }
     
    .form__email,
    .form__password {
        display: flex;
        flex-direction: column;
    }

    .form__email input,
    .form__password input {
        padding: 10px;
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
        padding-left: 10px;
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

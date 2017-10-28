<template>
    <div >
            <nav class="navbar navbar-default navbar-static-top">
                <div class="container">
                    <div class="navbar-header">
                        <button type="button" data-toggle="collapse" data-target="#app-navbar-collapse" aria-expanded="false" class="navbar-toggle collapsed">
                            <span class="sr-only">Toggle Navigation</span> 
                            <span class="icon-bar"></span> 
                            <span class="icon-bar"></span> 
                            <span class="icon-bar"></span>
                        </button> 
                        <a href="http://dev.josema-v2:705" class="navbar-brand">
                            Laravel
                        </a>
                    
                    </div> 
                    <div id="app-navbar-collapse" class="collapse navbar-collapse">
                        <ul class="nav navbar-nav">
                            &nbsp;
                        </ul> 
                        <ul class="nav navbar-nav navbar-right">
                            <li>
                                <a href="http://dev.josema-v2:705/login">Login</a>
                            </li> 
                            <li>
                                <a href="http://dev.josema-v2:705/register">Register</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav> 
            <div class="container">
                <div class="row">
                    <div class="col-md-8 col-md-offset-2">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                Login
                            </div> 
                            <div class="panel-body"> 
                                <div class="form-group">
                                    <label for="email" class="col-md-4 control-label">E-Mail Address</label> 
                                    <div class="col-md-6">
                                        <input id="email" name="email" value="" required="required" autofocus="autofocus" class="form-control" type="email" v-model="loginData.user">
                                    </div>
                                </div> 
                                <div class="form-group">
                                    <label for="password" class="col-md-4 control-label">Password</label> 
                                    <div class="col-md-6">
                                        <input id="password" name="password" required="required" class="form-control" type="password" v-model="loginData.password">
                                    </div>
                                </div> 
                                <div class="form-group">
                                    <div class="col-md-6 col-md-offset-4">
                                        <div class="checkbox">
                                            <label>
                                                <input name="remember" type="checkbox"> 
                                                    Remember Me
                                            </label>
                                        </div>
                                    </div>
                                </div> 
                                <div class="form-group">
                                    <div class="col-md-8 col-md-offset-4">
                                        <button type="submit" v-on:click="login(loginData.user,loginData.password)" class="btn btn-primary">
                                            Login
                                        </button> 
                                        <a href="http://dev.josema-v2:705/password/reset" class="btn btn-link">
                                            Forgot Your Password?
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div> 
</template>

<script>
    export default {
        data:function(){
            return {
                loginData:{user:null,password:null}
            }
        }
    }
</script>

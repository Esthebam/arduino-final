import React, {useEffect, useState} from 'react';
import {Container, CssBaseline, Avatar, Typography, 
    Button, Grid, Link, makeStyles, Card, CardContent} from '@material-ui/core';
import {LockRounded} from '@material-ui/icons';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import fire from '../helpers/db';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const SignUp = (props) => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPassowerd = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSignUp = () => {
        fire.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(response => {
                if(response) {
                    props.toggle();
                    toast.success('¡Usuario registrado con exito!');
                }
            }).catch((error) => {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        toast.error('El email ya está siendo utilizada por otra cuenta.');
                        break;
                    case 'auth/invalid-email': 
                        toast.error('El email está mal formateado.');                    
                        break;
                    case 'auth/weak-password':
                        toast.error('La contraseña debe tener 6 caracteres o más.');
                        break;
                }
            });
    };

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if(value !== password) {
                return false;
            }
            return true;
        });
        return () => {
            ValidatorForm.removeValidationRule('isPasswordMatch');
        };
    }, [password]);

    return (
        <Container component="main" maxWidth="xs">
            <Card className={classes.card}>
                <CardContent>
                    <ToastContainer/>
                    <CssBaseline/>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockRounded/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Registrate
                        </Typography>
                        <ValidatorForm 
                         onSubmit={handleSignUp}
                         className={classes.form}>
                        <TextValidator
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Email"
                                onChange={handleEmail}
                                name="email"
                                value={email}
                                validators={['required', 'isEmail']}
                                errorMessages={['Este campo es requerido', 'El email no es válido']}
                                autoComplete='off'
                            />
                            <br/>
                            <TextValidator
                                variant="outlined"
                                fullWidth
                                label="Contraseña"
                                onChange={handlePassword}
                                name="password"
                                type="password"
                                value={password}
                                validators={['required']}
                                errorMessages={['Este campo es requerido']}
                                autoComplete="off"
                            />
                            <br/>
                            <TextValidator
                                variant="outlined"
                                label="Confirmar contraseña"
                                fullWidth
                                onChange={handleConfirmPassowerd}
                                name="confirmPassword"
                                type="password"
                                validators={['isPasswordMatch', 'required']}
                                errorMessages={['Las contraseñas no coinciden', 'Este campo es requerido']}
                                value={confirmPassword}
                                autoComplete="off"
                            />
                             <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className={classes.submit}
                            >
                                Registrate
                            </Button>
                            <Grid container>
                                <Grid item>
                                <Link onClick={props.toggle} className={classes.pointer} variant="body2">
                                    {"¿Ya tenés una cuenta? ¡Inicia sesión!"}
                                </Link>
                                </Grid>
                            </Grid>
                        </ValidatorForm>
                    </div>
                </CardContent>
            </Card>
        </Container>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%',
        marginTop: theme.spacing(1),
      },
      submit: {
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          margin: theme.spacing(3, 0, 2),
          color: '#fff'
      },
      card: {
          marginTop: '60px',
          paddingLeft: '20px',
          paddingRight: '20px',
          paddingBottom: '20px',
      },
      pointer: {
          cursor: 'pointer',
          color: 'red'
      }
}))
export default SignUp;
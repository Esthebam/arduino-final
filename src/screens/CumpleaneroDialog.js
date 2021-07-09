import React, {useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, Button,
    Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';

import enLocale from "date-fns/locale/en-US";
import esLocale from "date-fns/locale/es";
import {MuiPickersUtilsProvider, DatePicker} from "@material-ui/pickers";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


const CumpleaneroDialog = (props) => {
    const localeMap = {
        es: esLocale,
        en: enLocale
      };

    const [locale, setLocale] = useState("es");
    

    return (
        <Dialog
        fullWidth={true}
        maxWidth='lg'
        open={props.open}
        onClose={props.close}
        aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle>{props.formmode ?  'Agregar' : 'Actualizar'}  cumpleañero</DialogTitle>
            <ValidatorForm
                onSubmit={props.addCumpleanero}
            >
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextValidator
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Nombre"
                            onChange={props.changeNombre}
                            name="nombre"
                            value={props.nombre}
                            validators={['required']}
                            errorMessages={['Este campo es requerido']}
                            autoComplete='off'
                        />
                        </Grid>
                        <Grid item xs={6}>
                            <TextValidator
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Apellido"
                            onChange={props.changeApellido}
                            name="apellido"
                            value={props.apellido}
                            validators={['required']}
                            errorMessages={['Este campo es requerido']}
                            autoComplete='off'
                        />
                        </Grid>
                        {(() => {
                            if(props.formmode) {
                                return (
                                    <Grid item xs={6}>
                                        <MuiPickersUtilsProvider locale={localeMap[locale]} utils={DateFnsUtils}>
                                            <DatePicker value={props.fechaActual} onChange={props.changeFechaActual} />
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                )
                            }else {
                                return (
                                    <Grid item xs={6}>
                                        <MuiPickersUtilsProvider locale={localeMap[locale]} utils={DateFnsUtils}>
                                            <DatePicker value={props.fecha} onChange={props.changeFecha} />
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                )
                            }
                        })()}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.close} color="secondary">
                        Cerrar
                    </Button>
                    <Button type="submit" color="primary">
                       {props.formmode ? 'Agregar' : 'Actualizar'}
                    </Button>
                </DialogActions>
            </ValidatorForm>
        </Dialog>
    );
}

export default CumpleaneroDialog;
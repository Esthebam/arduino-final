import React, { useEffect, useState } from 'react';
import {Table, TableBody, TableCell, TableRow, TableHead,
    TableContainer, Paper, makeStyles, Container,
    Typography, Button, Grid, IconButton} from '@material-ui/core';
import {AddCircle, Edit, Delete} from '@material-ui/icons';
import {ScaleLoader} from 'react-spinners';
import {ToastContainer, toast} from 'react-toastify';
import {getCumpleaneros, addCumpleanero, getCumpleanero, updateCumpleanero, deleteCumpleanero} from '../data/cumpleaneroData';
import CustomerDialog from './CumpleaneroDialog';

const Cumpleanero = () => {
    const classes  = useStyles();
    const [cumpleaneros, setCumpleaneros] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [formMode, setFormMode] = useState(true);
    const [custId, setCustId] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [edad, setEdad] =  useState();
    const [fecha, setFecha] = useState('');
    const [fechaCalendar, setFechaCalendar] = useState();
    const override =`
        display: flex;
        align-items: center;
        justify-content: center;    
        border-color: red;
    `;
    const handleClose = () => {
        setOpen(false);
    }
    const handleNombre = (event) => {
        setNombre(event.target.value);
    }
    const handleApellido = (event) => {
        setApellido(event.target.value);
    }
    const handleEdad = (event) => {
        setEdad(event.target.value);
    }
    const handleFecha = (date) => {
        console.log('Hola');
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0');
        let yyyy = date.getFullYear();
        let res = dd + '/' + mm + '/' + yyyy;
        console.log(res);
        setFecha(res);
        setFechaCalendar(date);
    }
    const getlist = async () => { 
        try {
            setLoading(true);
            const list = await getCumpleaneros();
            setCumpleaneros(list);
            setLoading(false);
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    }
    const editCumpleanero = async (id) => {
            try {
                setFormMode(false);
                setCustId(id);
                const response = await getCumpleanero(id);
                console.log(response);
                 setNombre(response.nombre);
                 setApellido(response.apellido);
                 setEdad(response.edad);
                 setFecha(response.fecha);
                 let fecha = response.fecha;
                 let fechaSplit = fecha.split("/");
                 let fechaDateObject = new Date(+fechaSplit[2], fechaSplit[1] - 1, +fechaSplit[0]); 
                 setFechaCalendar(fechaDateObject)
                 setOpen(true);
            } catch (error) {
                toast.error(error.message);
            }

    }
    const deleteHandler = async (id) => {
            try {
                await deleteCumpleanero(id);
                getlist();
                toast.success('¡Cumpleañero eliminado con exito!');
            } catch (error) {
                toast.error(error.message);
            }
    }
    const handleAdd = () => {
            setOpen(true);
            setFormMode(true);
            setNombre('');
            setApellido('');
            setEdad();
            setFecha('');
    }

    const addCumpleaneroHandler = async () => {
            try {
                 const cumpleanero = {
                     nombre,
                     apellido,
                     edad,
                     fecha
                 }
                if (formMode) {
                    await addCumpleanero(cumpleanero);
                    toast.success('¡Cumpleañero añadido con exito!');
                    getlist();
                    setOpen(false);
                    setNombre('');
                    setApellido('');
                    setEdad();
                    setFecha('');
                }else {
                    await updateCumpleanero(custId, cumpleanero);
                    toast.success('¡Cumpleañero actualizado con exito!');
                    getlist();
                    setOpen(false);
                    setNombre('');
                    setApellido('');
                    setEdad();
                    setFecha('');
                }
            } catch (error) {
                toast.error(error.message);
            }
    }

    useEffect(() => {
        getlist();
    }, []);

    return (
        <Container className={classes.container}>
            <ToastContainer/>
            <TableContainer component={Paper}>
                <Grid container>
                    <Grid item xs={8}>
                    <Typography className={classes.title} variant="h6" component="div">
                        Todos los cumpleañeros
                    </Typography>
                    </Grid>
                    <Grid item xs={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAdd}
                        className={classes.button}
                        startIcon={<AddCircle/>}
                    >Agregar</Button>
                    </Grid>
                </Grid>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.head}>Nombre</TableCell>
                            <TableCell className={classes.head}>Apellido</TableCell>
                            <TableCell className={classes.head}>Edad</TableCell>
                            <TableCell className={classes.head}>Fecha</TableCell>
                            <TableCell className={classes.head}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cumpleaneros.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7}>
                                    <ScaleLoader 
                                     css={override}
                                    size={150}
                                    color={"#eb4034"}
                                    loading={loading}/>
                                </TableCell>
                            </TableRow>
                        ) : (
                            <>
                            {cumpleaneros.map((cump) => (
                                <TableRow key={cump.id}>
                                  <TableCell>{cump.nombre}</TableCell>
                                  <TableCell>{cump.apellido}</TableCell>
                                  <TableCell>{cump.edad}</TableCell>
                                  <TableCell>{cump.fecha}</TableCell>
                                  <TableCell>
                                    <IconButton onClick={() => editCumpleanero(cump.id)} color="primary" aria-label="Actualizar cumpleanero">
                                            <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => deleteHandler(cump.id)} color="secondary" aria-label="Eliminar cumpleanero">
                                        <Delete />
                                    </IconButton>
                                  </TableCell>
                              </TableRow>
                            ))}
                              
                            </>
                        )}
                        
                    </TableBody>
                </Table>  
            </TableContainer>
            <CustomerDialog
                open={open} 
                close={handleClose}
                formmode={formMode}
                nombre={nombre}
                apellido={apellido}
                edad={edad}
                fecha={fechaCalendar}
                changeNombre={handleNombre}
                changeApellido={handleApellido}
                changeEdad={handleEdad}
                changeFecha={handleFecha}
                addCumpleanero={addCumpleaneroHandler}
            />
        </Container>
    );
}


const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    container: {
        marginTop: '40px'
    }, 
    title: {
        flex: '1 1 100%',
        padding: '20px'
    },
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    button: {
        margin: theme.spacing(1),
        float: 'right',
    },
}));

export default Cumpleanero;
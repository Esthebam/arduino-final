import firebase from '../helpers/db';
import Cumpleanero from '../models/cumpleanero';


const firestore = firebase.firestore();

export const getCumpleaneros = async () => {
    try {
        const usuarioActual = localStorage.getItem('user');
        let mailUsuarioActual;
        if (usuarioActual != null) {
            mailUsuarioActual = JSON.parse(usuarioActual).email;
            const response = await firestore.collection('cumpleaneros').where("user", "==", mailUsuarioActual);
            const data = await response.get();
            let array = [];
            data.forEach(c => {
                const cumpleanero = new Cumpleanero(
                    c.id,
                    c.data().nombre,
                    c.data().apellido,
                    c.data().edad,
                    c.data().fecha
                );

                array.push(cumpleanero);
            });
            return array;
        }
    } catch (error) {
        throw error;
    }
};

export const addCumpleanero = async (cumpleanero) => {
    try {
        await firestore.collection('cumpleaneros').doc().set(cumpleanero);
    } catch (error) {
        throw error;
    }
};

export const getCumpleanero = async (id) => {
    try {
        const cumpleanero = await firestore.collection('cumpleaneros').doc(id);
        const data = await cumpleanero.get();
        return data.data();
    } catch (error) {
        throw error;
    }
};

export const updateCumpleanero = async (id, data) => {
    try {
        const cumpleanero = await firestore.collection('cumpleaneros').doc(id);
        await cumpleanero.update(data)
    } catch (error) {
        throw error;
    }
};

export const deleteCumpleanero = async (id) => {
    try {
        await firestore.collection('cumpleaneros').doc(id).delete();
    } catch (error) {
        throw error;
    }
};
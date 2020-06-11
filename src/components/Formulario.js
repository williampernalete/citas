import React, { Fragment, useState } from "react";
//import uuid from "uuid/v4";
import { v4 as uuid } from "uuid";

const Formulario = ({ crearCita }) => {
  // creamis el state de la cita
  const [cita, setCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });

  //creamos un state para manejar los error
  const [error, actualizarError] = useState(false);

  //actualizamos el state
  const actualizarState = (e) => {
    //console.log(e.target.name);
    setCita({
      ...cita, // importante: colocamos ...cita para copiar lo q existe en el state cita
      [e.target.name]: e.target.value,
    });
  };

  //extraemos la data del state
  const { mascota, propietario, fecha, hora, sintomas } = cita;

  //enviamos para guardar la cita
  const submitCita = (e) => {
    e.preventDefault();

    //Validar
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      actualizarError(true);
      return;
    }
    actualizarError(false);

    //Asignar ID
    cita.id = uuid();
    console.log(cita);

    //crear la Cita
    crearCita(cita);

    //Reiniciar Form
    setCita({
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: "",
    });
  };
  return (
    <Fragment>
      <h2>Formulario de Cita</h2>

      {error ? (
        <p className="alerta-error">Todos los campos son obligatorios</p>
      ) : null}

      <form onSubmit={submitCita}>
        <label>Nombre Mascota</label>
        <input
          type="text"
          placeholder="Nombre de Mascota"
          name="mascota"
          className="u-full-width"
          onChange={actualizarState}
          value={mascota}
        />
        <label>Nombre Dueño</label>
        <input
          type="text"
          placeholder="Nombre Dueño de la Mascota"
          name="propietario"
          className="u-full-width"
          onChange={actualizarState}
          value={propietario}
        />

        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={actualizarState}
          value={fecha}
        />

        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}
        />

        <label>Sintomas</label>
        <textarea
          className="u-full-width"
          name="sintomas"
          onChange={actualizarState}
          value={sintomas}
        ></textarea>
        <button type="submit" className="u-full-width button-primary">
          Grabar
        </button>
      </form>
    </Fragment>
  );
};

export default Formulario;

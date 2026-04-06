import { useState }               from "react";
import { ReservaProvider }         from "./Context/ReservaContext";
import { PantallaReserva }         from "./Pantallas/PantallaReserva";
import { PantallaSeleccionMesa }   from "./Pantallas/PantallaSeleccionMesa";
import { PantallaDatosReserva }    from "./Pantallas/PantallaDatosReserva";
import { PantallaExito }           from "./Pantallas/PantallaExito";
import { PantallaAdmin }           from "./Pantallas/PantallaAdmin";

export default function App() {
  const [pantalla, setPantalla] = useState("reserva");

  return (
    <>
      {/* ReservaProvider envuelve todo — igual que TemaProvider p.320 */}
      <ReservaProvider>
          {pantalla === "reserva" && (
            <PantallaReserva
              onNext={() => setPantalla("mesa")}
              onAdmin={() => setPantalla("admin")} />
          )}

          {pantalla === "mesa" && (
            <PantallaSeleccionMesa
              onNext={() => setPantalla("datos")}
              onBack={() => setPantalla("reserva")} />
          )}

          {pantalla === "datos" && (
            <PantallaDatosReserva
              onNext={() => setPantalla("exito")}
              onBack={() => setPantalla("mesa")} />
          )}

          {pantalla === "exito" && (
            <PantallaExito
              onReset={() => setPantalla("reserva")} />
          )}

          {pantalla === "admin" && (          // ← nuevo
            <PantallaAdmin
              onBack={() => setPantalla("reserva")} />
          )}
      </ReservaProvider>
    </>
  );
}
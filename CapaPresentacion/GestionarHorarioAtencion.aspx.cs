using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidades;
using CapaLogicaNegocio;

namespace CapaPresentacion
{
    public partial class GestionarHorarioAtencion : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Medico BuscarMedico(string dni)
        {
            return MedicoLN.getInstance().BuscarMedico(dni);
        }

        [WebMethod]
        public static HorarioAtencion AgregarHorario(String fecha, String hora, String idmedico)
        {
            HorarioAtencion objHorarioAtencion = new HorarioAtencion()
            {
                Fecha = Convert.ToDateTime(fecha),
                Hora = new Hora()
                {
                    hora = hora
                },
                Medico = new Medico()
                {
                    IdMedico = Convert.ToInt32(idmedico)
                },
            };

            return HorarioAtencionLN.getInstance().RegistrarHorarioAtencion(objHorarioAtencion);
            //Llamar a la capa negocio
        }

        [WebMethod]
        public static List<HorarioAtencion> ListarHorariosAtencion(String idmedico)
        {
            Int32 idMedico = Convert.ToInt32(idmedico);

            return HorarioAtencionLN.getInstance().Listar(idMedico);
        }

        [WebMethod]
        public static bool EliminarHorarioAtencion(String id)
        {
            Int32 idHorarioAtencion = Convert.ToInt32(id);

            return HorarioAtencionLN.getInstance().Eliminar(idHorarioAtencion);
        }

        [WebMethod]
        public static bool ActualizarHorarioAtencion(String idmedico, String idhorario, String fecha, String hora)
        {
            int idMedico = Convert.ToInt32(idmedico);
            Int32 idHorario = Convert.ToInt32(idhorario);

            HorarioAtencion objHorario = new HorarioAtencion()
            {
                IdHorarioAtencion = idHorario,
                Fecha = Convert.ToDateTime(fecha),
                Hora = new Hora()
                {
                    hora = hora
                },
                Medico = new Medico()
                {
                    IdMedico = idMedico
                }
            };
            return HorarioAtencionLN.getInstance().Editar(objHorario) != null;
        }
    }
}
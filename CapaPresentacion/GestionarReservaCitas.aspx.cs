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
    public partial class GestionarReservaCitas : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if(!IsPostBack)
            {
                LlenarEspecialidades();
            }
        }
        private void LlenarGridViewHorariosAtencion()
        {
            if (txtFechaAtencion.Text.Equals(string.Empty))
            {
                Response.Write("<script>alert('No ha ingresado una fecha valida')</script>");
                return;
            }
            //optener el valor de la fecha de atención
            string fecha = txtFechaAtencion.Text;
            DateTime fechaBusqueda = Convert.ToDateTime(fecha);

            //optenemos idspecialidad
            Int32 idEspecialidad = Convert.ToInt32(ddlEspecialidad.SelectedValue);

            List<HorarioAtencion> Lista = HorarioAtencionLN.getInstance().ListarHorarioReserva(idEspecialidad, fechaBusqueda);
            grdHorarioAtencion.DataSource = Lista;
            grdHorarioAtencion.DataBind();
        }
        private void LlenarEspecialidades()
        {
            List<Especialidad> Lista = EspecialidadLN.getInstance().Listar();

            ddlEspecialidad.DataSource = Lista;
            ddlEspecialidad.DataValueField = "IdEspecialidad";
            ddlEspecialidad.DataTextField = "Descripcion";
            ddlEspecialidad.DataBind();

        }
       
        [WebMethod]
        public static Paciente BuscarPacienteDNI(String dni)
        {
            return PacienteLN.getInstance().BuscarPacienteDNI(dni);
        }

        protected void btnBuscarHorario_Click(object sender, EventArgs e)
        {
           LlenarGridViewHorariosAtencion();
        }

    }
}
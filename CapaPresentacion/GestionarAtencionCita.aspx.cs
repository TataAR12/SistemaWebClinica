using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidades;
using CapaLogicaNegocio;

namespace CapaPresentacion
{
    public partial class GestionarAtencionCita : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                Int32 IdCita =Convert.ToInt32(Request.QueryString["idcita"]);
                LlenarDatosPaciente(IdCita);
            }
            //registro de la atencion cita
        }

        private void LlenarDatosPaciente(Int32 IdCita)
        { 
        //Llenar la informacion
        Paciente objPaciente = PacienteLN.getInstance().BuscarPacienteIdCita(IdCita);
            hfIdPaciente.Value = objPaciente.IdPaciente.ToString();
            lblNombres.Text = objPaciente.Nombres;
            lblApellidos.Text = objPaciente.ApPaterno + " " + objPaciente.ApMaterno;
            lblEdad.Text = objPaciente.Edad.ToString();
            lblSexo.Text = (objPaciente.Sexo == 'F') ? "Femenino" : "Masculino";
        }

        protected void btnRegistrar_Click(object sender, EventArgs e)
        { 
           Diagnostico objDiagnostico = new Diagnostico();
            objDiagnostico.HistoriaClinica.Paciente.IdPaciente = Convert.ToInt32(hfIdPaciente.Value);
            objDiagnostico.Observacion = txtObservaciones.Text;
            objDiagnostico.DDiagnostico = txtDiagnostico.Text;

           bool ok = DiagnosticoLN.getInstance().RegistrarDiagnostico(objDiagnostico);

            if (ok)
            {
                Response.Write("<sript>alert('Diagnóstico registrado correctamente.')</sript>");
                Response.Redirect("PanelGeneral.aspx");
            } 
            else
            {
                Response.Write("<sript>alert('No se pudo registrar el diagnóstico.')</sript>");

            }
        }
       
    }

}
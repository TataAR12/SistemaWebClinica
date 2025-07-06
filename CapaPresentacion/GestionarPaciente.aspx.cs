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
    public partial class frmGestionaPaciente : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                ddlSexo.Items.Clear();
                ddlSexo.Items.Add("Femenino");
                ddlSexo.Items.Add("Masculino");
            }

        }

        private Paciente GetEntity()
        {
            Paciente objPaciente = new Paciente();
            objPaciente.Idpaciente = 0;
            objPaciente.Nombres = txtNombres.Text;
            objPaciente.ApPaterno = txtApPaterno.Text;
            objPaciente.ApMaterno = txtApMaterno.Text;
            objPaciente.Edad = string.IsNullOrWhiteSpace(txtEdad.Text) ? 0 : Convert.ToInt32(txtEdad.Text);
            objPaciente.Sexo = (ddlSexo.SelectedValue == "Femenino")?'F': 'M'; //Maculino , Femenino
            objPaciente.NroDocumento = txtNroDocumento.Text;
            objPaciente.Direccion = txtDireccion.Text;
            objPaciente.Telefono = txtTelefono.Text;
            objPaciente.Estado = true;

            return objPaciente;
        }

       protected void btnRegistrar_Click(object sender, EventArgs e) 
        {
            //Registro paciente
            Paciente objPaciente = GetEntity();
            //Enviar a la capa de logica de negocio
            bool response = PacienteLN.getInstance().RegistrarPaciente(objPaciente);
            if (response == true)
            {
                Response.Write("<script>alert('REGISTRO CORRECTO.')</script>");
                // Limpiar los campos
                txtNombres.Text = "";
                txtApPaterno.Text = "";
                txtApMaterno.Text = "";
                txtEdad.Text = "";
                txtNroDocumento.Text = "";
                txtDireccion.Text = "";
                txtTelefono.Text = "";
                ddlSexo.ClearSelection(); // Limpia el dropdown
            }
            else
            {
                Response.Write("<script>alert('REGISTRO INCORRECTO.')</script>");
            }
        }
    }
}
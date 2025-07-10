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
                grdHorarioAtencion.DataSource = LlenarGridView();
                grdHorarioAtencion.DataBind();
            }
        }

        private List<ClaseTest> LlenarGridView()
        {
            List<ClaseTest> Lista = new List<ClaseTest>();
            Lista.Add(new ClaseTest { Hora = "10:00,", Medico ="Angie Rodriguez" });
            Lista.Add(new ClaseTest { Hora = "15:40,", Medico = "Davinson Rodri" });
            Lista.Add(new ClaseTest { Hora = "17:25,", Medico = "Rosa Rodriguez" });

            return Lista;
        }

        [WebMethod]
        public static Paciente BuscarPacienteDNI(String dni)
        {
            return PacienteLN.getInstance().BuscarPacienteDNI(dni);
        }
        //prueba
        public class ClaseTest
        {
            public string Hora { get; set; }
            public string Medico { get; set; }

        }
    }
}
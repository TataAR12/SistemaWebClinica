using CapaAcessoDatos;
using CapaEntidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace CapaLogicaNegocio
{
    public class HorarioAtencionLN
    {
            #region "PATRON SINGLETON"
        private static HorarioAtencionLN horarioAtencion = null;
        private HorarioAtencionLN() { }
        public static HorarioAtencionLN getInstance()
        {
            if (horarioAtencion == null)
            {
                horarioAtencion = new HorarioAtencionLN();
            }
            return horarioAtencion;
        }
        #endregion

        public HorarioAtencion RegistrarHorarioAtencion(HorarioAtencion objHorarioAtencion) 
        {
            try 
            {
                return HorarioAtencionDAO.getInstance().RegistrarHorarioAtencion(objHorarioAtencion);
            }
            catch (Exception ex) 
            {
                throw ex;
            }
        }
    }
}

using CapaEntidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using CapaAcessoDatos;

namespace CapaLogicaNegocio
{
    public class DiagnosticoLN
    {
        #region "PATRON SINGLETON"
        private static DiagnosticoLN objDiagnostico = null;
        private DiagnosticoLN() { }
        public static DiagnosticoLN getInstance()
        {
            if (objDiagnostico == null)
            {
                objDiagnostico = new DiagnosticoLN();
            }
            return objDiagnostico;
        }
        #endregion

        public bool RegistrarDiagnostico(Diagnostico objDiagnostico)
        {
            try
            {
                return DiagnosticoDAO.getInstance().RegistrarDiagnostico(objDiagnostico);
            }
            catch (Exception)
            {

                throw;
            }
           
        }
    }
}

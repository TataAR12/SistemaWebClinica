using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaAcessoDatos
{
    public class EspecialidadDAO
    {
        #region "PATRON SINGLETON"
        private static EspecialidadDAO daoEspecialidad = null;
        private EspecialidadDAO() { }
        public static EspecialidadDAO getInstance()
        {
            if (daoEspecialidad == null)
            {
                daoEspecialidad = new EspecialidadDAO();
            }
            return daoEspecialidad;
        }
        #endregion

    }
}

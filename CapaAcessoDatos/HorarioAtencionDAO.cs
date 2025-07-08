using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidades;
using System.Diagnostics.Eventing.Reader;
using System.Timers;

namespace CapaAcessoDatos
{
    public class HorarioAtencionDAO
    {
        #region "PATRON SINGLETON"
        private static HorarioAtencionDAO daoHorarioAtencionDAO = null;
        private HorarioAtencionDAO() { }
        public static HorarioAtencionDAO getInstance()
        {
            if (daoHorarioAtencionDAO == null)
            {
                daoHorarioAtencionDAO = new HorarioAtencionDAO();
            }
            return daoHorarioAtencionDAO;
        }
        #endregion

        public HorarioAtencion RegistrarHorarioAtencion(HorarioAtencion objHorarioAtencion)
        {
            SqlConnection connection = Conexion.getInstance().ConexionBD();
            SqlCommand cmd = null;
            SqlDataReader dr = null;
            HorarioAtencion objHorario = null;

            try
            {
                cmd = new SqlCommand("spRegistrarHorarioAtencion", connection);
                cmd.Parameters.AddWithValue("@prmIdMedico", objHorarioAtencion.Medico.IdMedico);
                cmd.Parameters.AddWithValue("@prmHora", objHorarioAtencion.Hora.hora);
                cmd.Parameters.AddWithValue("@prmFecha", objHorarioAtencion.Fecha);
                cmd.CommandType = CommandType.StoredProcedure;

                connection.Open();

                dr = cmd.ExecuteReader();

                if (dr.Read())
                {
                    // General el objeto HorarioAtencion
                    objHorario = new HorarioAtencion()
                    {
                        IdHorarioAtencion = Convert.ToInt32(dr["idHorarioAtencion"].ToString()),
                        Fecha = Convert.ToDateTime(dr["fecha"].ToString()),
                        Hora = new Hora()
                        {
                            IdHora = Convert.ToInt32(dr["idHora"].ToString()),
                            hora = dr["hora"].ToString()
                        },
                        Estado = Convert.ToBoolean(dr["estado"].ToString())
                    };
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                connection.Close();
            }

            return objHorario;
        }
    }    
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidades;
using System.Data;
using System.Data.SqlClient;
using System.Runtime.InteropServices;


namespace CapaAcessoDatos
{
    public class PacienteDAO
    {
        #region "PATRON SINGLETON"
        private static PacienteDAO daoEmpleado = null;
        private PacienteDAO() { }
        public static PacienteDAO getInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new PacienteDAO();
            }
            return daoEmpleado;
        }
        #endregion

        public bool RegistrarPaciente(Paciente objPaciente)
        {
            SqlConnection con = null;
            SqlCommand cmd = null;
            bool response = false;
            try
            {
                con = Conexion.getInstance().ConexionBD();
                cmd = new SqlCommand("spRegistrarPaciente", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@prmNombres", objPaciente.Nombres);
                cmd.Parameters.Add("@prmApPaterno", objPaciente.ApPaterno);
                cmd.Parameters.Add("@prmApMaterno", objPaciente.ApMaterno);
                cmd.Parameters.Add("@prmEdad", objPaciente.Edad);
                cmd.Parameters.Add("@prmSexo", objPaciente.Sexo);
                cmd.Parameters.Add("@prmNroDoc", objPaciente.NroDocumento);
                cmd.Parameters.Add("@prmDireccion", objPaciente.Direccion);
                cmd.Parameters.Add("@prmTelefono", objPaciente.Telefono);
                cmd.Parameters.Add("@prmEstado", objPaciente.Estado);

                con.Open();
               int filas = cmd.ExecuteNonQuery();
                if (filas > 0) response = true;
            }
            catch (Exception ex)
            {
                response = false; 

                throw ex;
            }
            finally
            { 
            con.Close();
            }
            return response;

        }
        public List<Paciente> ListarPacientes()
        {
            List<Paciente> lista = new List<Paciente>();
            SqlConnection con = null;
            SqlCommand cmd = null;
            SqlDataReader dr = null;

            try
            {
                con = Conexion.getInstance().ConexionBD();
                cmd = new SqlCommand("spListarPacientes", con);
                cmd.CommandType = CommandType.StoredProcedure;

                con.Open();
                dr = cmd.ExecuteReader();

                while(dr.Read())
                {
                    //Crear objetos de tipo Paciente
                    Paciente objPaciente = new Paciente();
                    objPaciente.Idpaciente = Convert.ToInt32(dr["idPaciente"].ToString());
                    objPaciente.Nombres = dr["nombres"].ToString();
                    objPaciente.ApPaterno = dr["apPaterno"].ToString();
                    objPaciente.ApMaterno = dr["apMaterno"].ToString();
                    objPaciente.Edad = Convert.ToInt32(dr["edad"].ToString());
                    objPaciente.Sexo = Convert.ToChar(dr["sexo"].ToString());
                    objPaciente.NroDocumento = dr["nroDocumento"].ToString();
                    objPaciente.Direccion = dr["direccion"].ToString();
                    objPaciente.Estado = true;

                    //añadir el objeto a la lista
                    lista.Add(objPaciente);
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {  
                con.Close(); }


        return lista;
        }



    }
}

﻿using CapaEntidades;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaAcessoDatos
{
    public class DiagnosticoDAO
    {
        #region "PATRON SINGLETON"
        private static DiagnosticoDAO daoDiagnostico = null;
        private DiagnosticoDAO() { }
        public static DiagnosticoDAO getInstance()
        {
            if (daoDiagnostico == null)
            {
                daoDiagnostico = new DiagnosticoDAO();
            }
            return daoDiagnostico;
        }
        #endregion

        public bool RegistrarDiagnostico(Diagnostico objDiagnostico)
        {
            SqlConnection con = null;
            SqlCommand cmd = null;
            bool response = false;
            try
            {
                con = Conexion.getInstance().ConexionBD();
                cmd = new SqlCommand("spRegistrarDiagnostico", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@prmIdPaciente", objDiagnostico.HistoriaClinica.Paciente.IdPaciente);
                cmd.Parameters.Add("@prmObservacion", objDiagnostico.Observacion);
                cmd.Parameters.Add("@prmDiagnostico", objDiagnostico.DDiagnostico);

                con.Open();
                cmd.ExecuteNonQuery();
                response = true;
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
    }
}

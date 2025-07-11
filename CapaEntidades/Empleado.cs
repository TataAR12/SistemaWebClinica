﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidades
{
    public class Empleado
    {
        public int ID {  get; set; }
        public TipoEmpleado RTipoEmpleado { get; set; }
        public String Nombre { get; set; }
        public String ApPaterno { get; set; }
        public String ApMaterno { get; set; }
        public String NroDocumento { get; set; }
        public bool Estado {  get; set; }
        public String Imagen {  get; set; }
        public String Usuario { get; set; }
        public String Clave { get; set; }

        public Empleado() { }

        public Empleado(int ID, TipoEmpleado RTipoEmpleado, string Nombre, string ApPaterno, string ApMaterno, string NroDocumento, bool Estado, string Imagen, string Usuario, string Clave)
        {
            this.ID = ID;
            this.RTipoEmpleado = RTipoEmpleado;
            this.Nombre = Nombre;
            this.ApPaterno = ApPaterno;
            this.ApMaterno = ApMaterno;
            this.NroDocumento = NroDocumento;
            this.Estado = Estado;
            this.Imagen = Imagen;
            this.Usuario = Usuario;
            this.Clave = Clave;
        }
    }
}

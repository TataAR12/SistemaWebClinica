﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidades
{
    public class Especialidad
    {
        public int IdEspecialidad { get; set; }
        public string Descripcion { get; set; }
        public bool Estado { get; set; }


        public Especialidad()
        {

        }
        public Especialidad(int IdEspecialidad, String Descripcion, bool Estado) 
        {
            this.IdEspecialidad = IdEspecialidad;
            this.Descripcion = Descripcion;
            this.Estado = Estado;
        }
        
    }
}

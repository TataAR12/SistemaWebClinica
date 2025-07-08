<%@ Page Title="" Language="C#" MasterPageFile="~/Home.Master" AutoEventWireup="true" CodeBehind="GestionarHorarioAtencion.aspx.cs" Inherits="CapaPresentacion.GestionarHorarioAtencion" ClientIDMode="Static" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/timepicker/bootstrap-timepicker.min.css" rel="stylesheet" />
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section class="content-header">
        <h1 style="text-align: center">GESTION DE HORARIOS DE MÉDICOS</h1>
    </section>

    <section class="content">
        <div class="row">
            <!-- Columna izquierda -->
            <div class="col-md-4">
                <div class="box box-primary">
                    <div class="box-header">
                        <h3 class="box-title">Datos del Médico</h3>
                    </div>
                    <div class="box-body">
                        <label>Nro. Documento de identidad</label>
                        <div class="input-group">
                            <asp:TextBox ID="txtDni" runat="server" CssClass="form-control"></asp:TextBox>
                            <span class="input-group-btn">
                                <asp:Button ID="bntBuscar" CssClass="btn btn-info btn-flat" runat="server" Text="Buscar" />
                            </span>

                        </div>
                    </div>
                    <div class="box-footer">
                        <strong>Nombres</strong>
                        <asp:Label ID="lblNombres" runat="server"></asp:Label> <br /><br />
                        <strong>Apellidos</strong>
                        <asp:Label ID="lblApellidos" runat="server"></asp:Label> <br /><br />
                        <strong>Especialidad</strong>
                        <asp:Label ID="lblEspecialidad" runat="server"></asp:Label> <br /><br />
                    </div>
                </div>
            </div>

            <!-- Columna derecha -->
            <div class="col-md-8">
                <div class="box box-primary">
                    <div class="box-header">
                        <h3 class="box-title">Horario de Atención</h3>
                    </div>
                    <div class="box-body table table-responsive">
                        <table id="tbl_pacientes" class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th>FECHA DE ATENCIÓN</th>
                                    <th>HORA DE ATENCIÓN</th>
                                    <thstyle="display: none">ESTADO</thstyle="display:>
                                </tr>
                            </thead>
                            <tbody id="tbl_body_table">
                                <!-- Aquí se llenan los datos con JavaScript o desde el backend -->
                                <tr>
                                    <td>boton-editar</td>
                                    <td>editar-eliminar</td>
                                    <td>campo-fecha</td>
                                    <td>campo-hora</td>
                                    <td style="display: none">estado</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="box-footer" style="text-align: center">
                       <%-- <asp:Button ID="btnAgregarHorario" runat="server" CssClass="btn btn-primary" Text="Agregar Horario" />--%>
                        <asp:LinkButton ID="btnAgregarHorario" runat="server" CssClass="btn btn-primary" href="#AgregarHorario" data-toggle="modal">Agregar Horario</asp:LinkButton>
                        <asp:Button ID="btnGuardarHorario" runat="server" CssClass="btn btn-success" Text="Guardar Horaario" />
                    </div>
                </div>
            </div>
        </div>
 </section>
<!-- Nuevo -->
        <div class="modal fade" id="AgregarHorario" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
                <h3 class="modal-title"><i class="fa fa-clock-o"></i> Agregar Horario Atención</h3>
            </div>

            <div class="modal-body">
                <div class="form-group">
                    <label>Fecha:</label>
                    <div class="input-group">
                        <div class="input-group-addon">
                            <i class="fa fa-calendar"></i>
                        </div>
                        <asp:TextBox ID="txtFecha" CssClass="form-control" data-inputmask="'alias': 'dd/mm/yyyy'" data-mask="" runat="server"></asp:TextBox>
                    </div>
                </div>

                <div class="bootstrap-timepicker">
                    <div class="form-group">
                        <label>Hora Inicio:</label>
                        <div class="input-group">
                            <asp:TextBox ID="txtHoraInicio" CssClass="form-control timepicker" runat="server"></asp:TextBox>
                            <div class="input-group-addon">
                                <i class="fa fa-clock-o"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal-footer clearfix">
                <asp:Button ID="btnAgregar" runat="server" CssClass="btn btn-primary" Text="Agregar" />
            </div>

        </div>
    </div>
</div>
    <input type="hidden" id="txtIdMedico" />

<!-- fin -->
   
</asp:Content>


<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="js/plugins/input-mask/jquery.inputmask.js"></script>
    <script src="js/plugins/input-mask/jquery.inputmask.date.extensions.js"></script>
    <script src="js/plugins/input-mask/jquery.inputmask.extensions.js"></script>
    <script src="js/plugins/timepicker/bootstrap-timepicker.min.js"></script>
    <script src="js/horariosmedico.js"></script>
</asp:Content>

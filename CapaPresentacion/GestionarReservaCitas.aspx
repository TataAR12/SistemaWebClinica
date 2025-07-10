<%@ Page Title="" Language="C#" MasterPageFile="~/Home.Master" AutoEventWireup="true" CodeBehind="GestionarReservaCitas.aspx.cs" Inherits="CapaPresentacion.GestionarReservaCitas" ClientIDMode="Static" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section class="content-header">
    <h1 align="center">RESERVA DE CITAS</h1>
        </section>
    <section class="content">
        <div class="box-header">
            <h3 align="center" class="box-title">DATOS DEL PACIENTE</h3>
        </div>
        <div class="row">
            <!--left column -->
            <div class="col-md-6">
                <div class="box box-primary">
                    <div class="box-body">
                        <div class="form-group">
                            <label>DOCUMENTO DE IDENTIDAD</label>
                        </div>
                        <div class="input-group">
                            <asp:TextBox ID="txtDNI" CssClass="form-control" runat="server" MaxLength="8"></asp:TextBox>
                            <div class="input-group-btn">
                                <asp:Button ID="btnBuscar" runat="server" CssClass="btn btn-danger" Text="BUSCAR" />
                            </div>
                        </div>
                        <br />
                        <div class="form-group">
                            <label>NOMBRES</label>
                            <asp:TextBox ID="txtNombres" CssClass="form-control" runat="server" Enabled="false"></asp:TextBox>
                        </div>
                        <div class="form-group">
                            <label>APELLIDOS</label>
                            <asp:TextBox ID="txtApellidos" CssClass="form-control" runat="server" Enabled="false"></asp:TextBox>
                        </div>
                    </div>
                    <!-- </form> -->
                </div>
            </div>
            <!--rigth column -->
            <div class="col-md-6">
                <div class="box box-primary">
                    <br />
                    <div class="box-body">
                        <div class="form-group">
                            <label>TELÉFONO</label>
                            <asp:TextBox ID="txtTelefono" CssClass="form-control" runat="server" Enabled="false"></asp:TextBox>
                        </div>
                        <div class="form-group">
                            <label>EDAD</label>
                            <asp:TextBox ID="txtEdad" CssClass="form-control" runat="server" Enabled="false"></asp:TextBox>
                        </div>
                        <div class="form-group">
                            <label>SEXO</label>
                            <asp:TextBox ID="txtSexo" CssClass="form-control" runat="server" Enabled="false"></asp:TextBox>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <section class="content-header">
            <h3 align="center">HORARIOS DE ATENCIÓN</h3>
        </section>
        <!--SELECCIONAR HORARIO DE ATENCION -->
        <div class="row">
            <div class="col-md-6">
                <div class="box box-primary">
                    <div class="box-body">
                        <!-- INICIO CALENDARIO -->

                        <div class="form-group">
                            <label>FECHA</label>
                            <div class="input-group">
                                <div class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </div>
                                <asp:TextBox ID="txtFechaAtencion" runat="server" CssClass="form-control" data-inputmask="'alias': 'dd/mm/yyyy'" data-mask=""></asp:TextBox>
                            </div>
                            <!-- /.input group -->
                        </div>
                        
                    </div>
                    <!-- </form> -->
                </div>
            </div>
            <!--rigth column -->
            <div class="col-md-4">
                <div class="box box-primary">
                    <div class="box-body">
                        <!-- <form role="form"> -->
                        <div class="form-group">
                            <label>ESPECIALIDAD</label>
                            <asp:DropDownList ID="ddlEspecialidad" CssClass="form-control" runat="server"></asp:DropDownList>
                        </div>
                        <!-- </form> -->
                    </div>
                </div>
            </div>
            <div class="col-md-2">
                <div class="box box-primary">
                    <div class="box-body">
                        <!-- <form role="form"> -->
                        <div class="input-group-">
                            <asp:Button ID="btnBuscarHorario" runat="server" CssClass="btn btn-danger" Text="Buscar" />
                            <br />
                            <br />
                            <br />
                        </div>
                    </div>
                    <!-- </form> -->
                </div>
            </div>
               <div class="row">
    <div class="col-md-12">
        <div class="table-responsive">
            <asp:GridView ID="grdHorarioAtencion" runat="server" CssClass="table table-bordered table-hover" AutoGenerateColumns="false">
                <Columns>
                    <asp:TemplateField>
                        <HeaderTemplate>
                            <asp:Label ID="lblSeleccionarHeader" runat="server" Text="Seleccionar"></asp:Label>
                        </HeaderTemplate>
                        <ItemTemplate>
                            <asp:CheckBox ID="chkSeleccionar" runat="server" />
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField>
                        <HeaderTemplate>
                            <asp:Label ID="lblHoraHeader" runat="server" Text="Hora de atención"></asp:Label>
                        </HeaderTemplate>
                        <ItemTemplate>
                            <asp:Label ID="lblHora" runat="server" Text='<%# Eval("Hora") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField>
                        <HeaderTemplate>
                            <asp:Label ID="lblMedicoHeader" runat="server" Text="Médico"></asp:Label>
                        </HeaderTemplate>
                        <ItemTemplate>
                            <asp:Label ID="lblMedicoHora" runat="server" Text='<%# Eval("Medico") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                </Columns>
            </asp:GridView>
        </div>
    </div>
</div>
    </section>
    <input id="idPaciente" type="hidden"/> 
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="js/reserva.js"></script>
</asp:Content>

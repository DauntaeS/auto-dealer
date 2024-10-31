from django.shortcuts import render
from common.json import ModelEncoder
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .encoders import TechnicianlistEncoder, AppointmentListEncoder, AppointmentDetailEncoder
from .models import Technician, Appointment

# Create your views here.
@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianlistEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            technicians = Technician.objects.create(**content)
            return JsonResponse(
                technicians,
                encoder=TechnicianlistEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"error": "Technician does not exist."},
                status=404
            )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_technicians(request, pk):
    if request.method == "GET":
        technician = Technician.objects.get(id=pk)
        return JsonResponse(
            technician,
            encodeer=TechnicianlistEncoder,
            safe=False,
        )
    if request.method == "DELETE":
        count, _ = Technician.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentDetailEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            technician_id = content["technician"]
            technician = Technician.objects.get(employee_id=technician_id)
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician id"},
                status=404,
            )
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET"])
def api_show_appointments(request, pk):
    if request.method == "GET":
        appointment = Appointment.objects.get(id=pk)
        return JsonResponse(
            appointment,
            encodeer=AppointmentDetailEncoder,
            safe=False,
        )
    if request.method == "DELETE":
        count, _ = Appointment.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})



@require_http_methods(["PUT"])
def api_cancel_appointment(request, pk):
    if request.method == "PUT":
        appointment = Appointment.objects.get(id=pk)
        appointment.cancel()
        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False,
        )

@require_http_methods(["PUT"])
def api_finish_appointment(request, pk):
    if request.method == "PUT":
        appointment = Appointment.objects.get(id=pk)
        appointment.finish()
        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False,
        )

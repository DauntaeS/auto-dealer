from common.json import ModelEncoder

from .models import Technician, Appointment

class TechnicianlistEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]

class AppointmentListEncoder():
    model = Appointment
    properties = [
        "customer",
        "reason",
    ]


class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "date_time",
        "reason",
        "vin",
        "customer",
        "technician",
    ]
    encoders = {
        "technician": TechnicianlistEncoder(),
    }

    def get_extra_data(self, o):
        return {"status": o.status}

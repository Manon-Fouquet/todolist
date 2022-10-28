from distutils.command.install_egg_info import safe_name
from warnings import catch_warnings
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
# For testing on Postman
from django.views.decorators.csrf import csrf_exempt   
import json

global task_list
task_list = {
    1:{"descr":"Acheter des pommes", "completed":True},
    2:{"descr":"Manger des pommes", "completed":False}
}

global last_id
last_id = 2

# Create your views here.
def hello_world(request):
    return HttpResponse('Hello')

def tasks(request):
    if request.method == "GET":
        return JsonResponse([{"id":key,"descr":val["descr"],"completed":val["completed"]} for (key,val) in task_list.items()],safe=False,status=200)

@csrf_exempt
def add_task(request):
    global last_id, task_list

    if request.method == "PUT":
        next_id = last_id+1
        new_val = json.loads(request.body)
        if("descr" in new_val and new_val["descr"]!="" and "completed" in new_val 
            and str(new_val["completed"]).lower() in ['true','false']):
            try:
                # Prepare response
                resp = JsonResponse(new_val)

                task_list[next_id] ={key:new_val[key] for key in new_val.keys()}
                last_id=next_id
                return resp
            except:
                return HttpResponseBadRequest("Failed adding task")
            
        else:
            return HttpResponseBadRequest("Task incorrectly formatted")
    else:
        return HttpResponseBadRequest("Use PUT with request")

@csrf_exempt
def delete_task(request,key_val):
    if request.method == "DELETE":
        try:
            resp = task_list.pop(key_val)
            return  JsonResponse(resp)
        except KeyError:
            return HttpResponseBadRequest("Could not find key {} in task list".format(key_val))

    return resp
        




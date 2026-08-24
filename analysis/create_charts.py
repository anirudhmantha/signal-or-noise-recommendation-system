from pathlib import Path
import matplotlib.pyplot as plt
import numpy as np

ROOT = Path(__file__).parents[1]; OUT = ROOT / "public/charts"; OUT.mkdir(parents=True, exist_ok=True)
plt.rcParams.update({"font.family":"DejaVu Sans","axes.spines.top":False,"axes.spines.right":False,"axes.edgecolor":"#c8cbc4","xtick.color":"#727872","ytick.color":"#727872","text.color":"#111614","axes.labelcolor":"#727872"})

contexts=["Intentional","Workout","Party","Focus","Autoplay","Shared","Sleep"]
noise=[8,18,37,62,69,73,79]
fig,ax=plt.subplots(figsize=(9,3.1),facecolor="#fbfaf4"); ax.set_facecolor("#fbfaf4")
bars=ax.bar(contexts,noise,color=["#55b77c","#78c694","#efc36d","#9ea7a0","#89938c","#ee8c7d","#ff735f"],width=.64)
ax.set_ylim(0,100); ax.set_ylabel("Estimated noise (%)",fontsize=8); ax.tick_params(labelsize=8); ax.grid(axis="y",alpha=.18)
for b,v in zip(bars,noise): ax.text(b.get_x()+b.get_width()/2,v+3,str(v)+"%",ha="center",fontsize=8)
fig.tight_layout(); fig.savefig(OUT/"session-noise.png",dpi=180,bbox_inches="tight",facecolor=fig.get_facecolor()); plt.close(fig)

metrics=["Precision@10","Save rate","Discovery rate","Skip rate"]
base=np.array([72.4,11.2,18.6,29.8]); aware=np.array([84.7,16.8,25.9,19.4]); x=np.arange(len(metrics)); w=.34
fig,ax=plt.subplots(figsize=(9,3.25),facecolor="#fbfaf4"); ax.set_facecolor("#fbfaf4")
ax.bar(x-w/2,base,w,label="All events baseline",color="#bcc1bc"); ax.bar(x+w/2,aware,w,label="Context-aware",color="#47ad70")
ax.set_xticks(x,metrics); ax.set_ylim(0,100); ax.tick_params(labelsize=8); ax.grid(axis="y",alpha=.18); ax.legend(frameon=False,fontsize=8,ncol=2,loc="upper right")
fig.tight_layout(); fig.savefig(OUT/"model-lift.png",dpi=180,bbox_inches="tight",facecolor=fig.get_facecolor()); plt.close(fig)
print(f"charts written to {OUT}")
